#!/usr/bin/env bash

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
INSTALLDIR=$SCRIPTPATH/../dist5/

if [ ! -d INSTALLDIR ]; then
 mkdir -p ${INSTALLDIR}
fi

current="$(curl -fsSL 'https://downloads.joomla.org/api/v1/latest/cms' | jq -r '.branches[] | select(.branch=="Joomla! 5").version')"

curl -o ${INSTALLDIR}joomla.tar.gz -SL https://github.com/joomla/joomla-cms/releases/download/${current}/Joomla_${current}-Stable-Full_Package.tar.gz
tar xfvj ${INSTALLDIR}joomla.tar.gz -C ${INSTALLDIR}
rm -f ${INSTALLDIR}joomla.tar.gz