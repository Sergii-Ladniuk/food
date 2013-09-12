#!/bin/sh
bin="../../bin/"
sudo dpkg -i $bin/jdk_1.7.004-1_amd64.deb
# firefox plugin config
mkdir -p ~/.mozilla/plugins
ln -s /usr/java/jdk1.7.0_04/jre/lib/amd64/libjavaplugin_jni.so ~/.mozilla/plugins/
ln -s /usr/java/jdk1.7.0_04/jre/lib/amd64/libnpjp2.so ~/.mozilla/plugins/
