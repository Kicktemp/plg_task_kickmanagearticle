#!/bin/bash
EXTENSION_ZIP_FILENAME="$(find archives -name '*.zip')"
SHA256=$(shasum -a 256 $EXTENSION_ZIP_FILENAME | awk '{print $1}')
SHA384=$(shasum -a 384 $EXTENSION_ZIP_FILENAME | awk '{print $1}')
SHA512=$(shasum -a 512 $EXTENSION_ZIP_FILENAME | awk '{print $1}')
sed -i -e "s/\(<sha256>\[SHA256\]<\/sha256>\)/<sha256>$SHA256<\/sha256>/g"  update.xml
sed -i -e "s/\(<sha384>\[SHA384\]<\/sha384>\)/<sha384>$SHA384<\/sha384>/g"  update.xml
sed -i -e "s/\(<sha512>\[SHA512\]<\/sha512>\)/<sha512>$SHA512<\/sha512>/g"  update.xml
echo 'package and update server ready'
rm update.xml-e
