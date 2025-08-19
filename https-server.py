#!/usr/bin/env python3
"""
HTTPS Local Server for Amedeo Rosenfield's Personal Website

This script creates a self-signed certificate and serves your website over HTTPS locally.
Usage: python https-server.py

Note: Self-signed certificates will show a security warning in browsers, but this is normal for local development.
"""

import http.server
import socketserver
import ssl
import os
import subprocess
import sys
from pathlib import Path

def create_self_signed_cert():
    """Create a self-signed certificate for local HTTPS testing."""
    cert_file = "localhost.crt"
    key_file = "localhost.key"
    
    if not (os.path.exists(cert_file) and os.path.exists(key_file)):
        print("Creating self-signed certificate...")
        try:
            # Create self-signed certificate using OpenSSL
            subprocess.run([
                "openssl", "req", "-x509", "-newkey", "rsa:4096", 
                "-keyout", key_file, "-out", cert_file, "-days", "365", "-nodes",
                "-subj", "/C=US/ST=State/L=City/O=Organization/CN=localhost"
            ], check=True, capture_output=True)
            print("✅ Certificate created successfully!")
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ OpenSSL not found. Please install OpenSSL or use HTTP server.")
            print("   You can still use HTTP for local development: python -m http.server 8000")
            return False
    else:
        print("✅ Certificate already exists!")
    
    return True

def start_https_server():
    """Start HTTPS server with self-signed certificate."""
    PORT = 8443
    
    if not create_self_signed_cert():
        return
    
    # Create SSL context
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain('localhost.crt', 'localhost.key')
    
    # Create server
    with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
        httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
        print(f"🚀 HTTPS Server running at: https://localhost:{PORT}")
        print("⚠️  Note: Browser will show security warning for self-signed certificate")
        print("   Click 'Advanced' → 'Proceed to localhost (unsafe)' to continue")
        print("   Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    start_https_server()
