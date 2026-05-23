#!/usr/bin/env python3
import http.server
import mimetypes

mimetypes.add_type('text/javascript', '.jsx')
mimetypes.add_type('text/javascript', '.mjs')

handler = http.server.SimpleHTTPRequestHandler
server = http.server.HTTPServer(('', 3000), handler)
print("Serveur sur http://localhost:3000")
server.serve_forever()
