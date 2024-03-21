import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Text } from '~/components/ui/text';
import * as ImagePicker from 'expo-image-picker';
interface PlaybackStatus {
    isPlaying?: boolean;
}

export default function ExecPage() {
    const video = useRef<Video>(null);
    const [status, setStatus] = useState<PlaybackStatus>({});

    const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
        if (!playbackStatus.isLoaded) {
            // 处理未加载视频的情况
        } else {
            // 当视频加载后，更新播放状态
            setStatus({
                isPlaying: playbackStatus.isPlaying,
            });
        }
    };
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
        } else {
            alert('You did not select any image.');
        }
    };
    return (
        <View className="m-4">
            <Button onPress={pickImageAsync}><Text>Select Your Video</Text></Button>
            <Video
                ref={video}
                source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            />
            <Button onPress={() => {
                if (video.current) {
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
                }
            }}>
                <Text>{status.isPlaying ? 'Pause' : 'Play'}</Text>
            </Button>
        </View>
    );
}
