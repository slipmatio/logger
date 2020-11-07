rm -rf dist node_modules/.rts2_cache
tsc --build tsconfig.json
mv build/src dist
cp README.md dist
cp LICENSE dist
rm -rf build
