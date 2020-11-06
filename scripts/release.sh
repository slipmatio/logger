set -e
VERSION=$(grep version package.json | sed -E 's/^.*"([0-9][^"]+)".*$/\1/')

read -p "Release v$VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing v$VERSION ..."
  yarn run build
  
  yarn publish --new-version "$VERSION" --access public
  git push -u origin --all
  git push -u origin --tags
fi
