cd DataVisWeb
npm run build
cd ..
rm -rf /server/public
cp /DataVisWeb/dist /server/
mv server/dist server/public