#!/bin/bash

# Xóa thư mục .next
echo "Removing .next directory..."
rm -rf .next

# Xóa node_modules/.cache
echo "Removing node_modules/.cache..."
rm -rf node_modules/.cache

# Xóa các file không cần thiết
echo "Removing unnecessary files..."
find . -name "*.log" -type f -delete

echo "Cache cleared successfully!"
echo "Now you can restart the development server with: npm run dev"
