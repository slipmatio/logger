rm -rf dist node_modules/.rts2_cache
tsc --build tsconfig.json
rsync -a build/src/ .
rm -rf build
