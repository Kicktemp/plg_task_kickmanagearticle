#!/usr/bin/env bash

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
INSTALLDIR=$SCRIPTPATH/../dist/

if [ ! -d INSTALLDIR ]; then
 mkdir -p ${INSTALLDIR}
fi

current="$(curl -fsSL 'https://downloads.joomla.org/api/v1/latest/cms' | jq -r '.branches[3].version')"

curl -o ${INSTALLDIR}joomla.tar.bz2 -SL https://github.com/joomla/joomla-cms/releases/download/${current}/Joomla_${current}-Stable-Full_Package.tar.bz2
tar xfvj ${INSTALLDIR}joomla.tar.bz2 -C ${INSTALLDIR}
rm -f ${INSTALLDIR}joomla.tar.bz2
