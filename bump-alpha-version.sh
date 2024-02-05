version=$(node -pe 'require("./package.json").version')
echo "Current version: $version"

if [[ $version =~ ([0-9]+\.[0-9]+\.[0-9]+-alpha\.[0-9]+) ]]; then
  version_number=$(echo "$version" | cut -d'-' -f1)
  echo "Version number: $version_number"

  alpha_number=$(echo "$version" | cut -d'-' -f2 | cut -d'.' -f2)
  echo "Alpha number: $alpha_number"

  new_alpha_number=$((alpha_number + 1))
  echo "New Alpha number: $new_alpha_number"

  new_alpha_version="alpha.$new_alpha_number"
  echo "New Alpha: $new_alpha_version"

  full_alpha_version="$version_number-$new_alpha_version"
else
  echo "No alpha version found in $version - setting to alpha.0"
  full_alpha_version="$version-alpha.0"
fi

echo "New Full Alpha version: $full_alpha_version"

git config --global user.name 'github-actions[bot]'
git config --global user.email 'github-actions[bot]@users.noreply.github.com'
npm version $full_alpha_version

echo "Updated version to $full_alpha_version"

git push
echo "Pushed to GitHub"