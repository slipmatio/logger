rm -rf dist node_modules/.rts2_cache
tsc --build tsconfig.json
mv build/src dist
rm -rf build
