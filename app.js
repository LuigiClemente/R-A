import React, {useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AudioRecorder from 'react-native-audio';
import Sound from 'react-native-sound';
import Share from 'react-native-share';

const App = () => {
  const audioFile = 'testRecording.wav';

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await AudioRecorder.requestAuthorization();
      } catch (error) {
        console.log('Failed to request permissions', error);
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    AudioRecorder.prepareRecordingAtPath(audioFile, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'wav',
      AudioEncodingBitRate: 32000,
    });
  }, []);

  const startRecording = async () => {
    try {
      await AudioRecorder.startRecording();
    } catch (error) {
      console.log('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      await AudioRecorder.stopRecording();
    } catch (error) {
      console.log('Failed to stop recording', error);
    }
  };

  const playRecording = (audioFile) => {
    const sound = new Sound(audioFile, '', (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      sound.play((success) => {
        if (!success) {
          console.log('Sound did not play successfully');
        }
        sound.release();
      });
    });
  };

  const shareRecording = async (audioFile) => {
    const shareOptions = {
      title: 'Share audio file',
      url: `file://${audioFile}`,
      failOnCancel: false,
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Failed to share audio file', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.recordButton}
        onPress={startRecording}>
        <Icon name="microphone" size={50} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.recordButton}
        onPress={stopRecording}>
        <Icon name="stop" size={50} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => playRecording(audioFile)}>
        <Icon name="play" size={50} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => shareRecording(audioFile)}>
        <Icon name="share" size={50} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  recordButton: {
    backgroundColor: '#F44336',
    padding: 20,
    borderRadius: 50,
    margin: 10,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 50,
    margin: 10,
  },
  shareButton: {
    backgroundColor: '#3F51B5',
    padding: 20,
    borderRadius: 50,
    margin: 10,
  },
});

export default App;