import RNFetchBlob from 'react-native-blob-util';
import { Platform, PermissionsAndroid } from 'react-native';
import moment from 'moment';

/// grant permission in android
export const getDownloadPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
  } catch (err) {
    console.log('err', err);
  }
};

export const downloadFile = async url => {
  // Get the app's cache directory
  const { config, fs } = RNFetchBlob;
  const cacheDir = fs?.dirs?.DownloadDir;

  // Generate a unique filename for the downloaded image
  const filename = url.split('/').pop();
  const currentDate = moment().format('YYYYMMDD_HHmmss');

  const imagePath = `${cacheDir}/${filename}`;

  const {
    dirs: { DownloadDir, DocumentDir },
  } = RNFetchBlob.fs;

  const directoryPath = Platform.select({
    ios: DocumentDir,
    android: DownloadDir,
  });
  const filePath = `${directoryPath}/${currentDate}${filename}`;

  try {
    // Download the file and save it to the cache directory
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
        appendExt: filename.split('.').pop(),
        notification: true,
      },
      android: {
        fileCache: true,
        path: imagePath,
        appendExt: filename.split('.').pop(),
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path: imagePath,
          description: 'File',
        },
      },
    });
    console.log('file download');
    const response = await RNFetchBlob.config(configOptions).fetch('GET', url);

    // Return the path to the downloaded file
    return response;
  } catch (error) {
    console.error('console---+',error);
    return null;
  }
};