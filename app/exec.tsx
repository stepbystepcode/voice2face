import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Text } from '~/components/ui/text';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
interface PlaybackStatus {
    isPlaying?: boolean;
}

export default function ExecPage() {
    const video = useRef<Video>(null);
    const [videoUri, setVideoUri] = useState<string>('');
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
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            const formData = new FormData();
            const assets = result.assets;
            if (!assets) return;
            console.log(assets)

            const file = assets[0];
            if (!file) return;
            setVideoUri(file.uri);

            const videoFile = {
                uri: file.uri,
                type: file.mimeType,
                size: file.fileSize,
            };

            formData.append("file", videoFile as any);

            const { data } = await axios.post('http://172.28.172.231:8000/upload', formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(data);
        } catch (error) {
            console.log("Error while selecting file: ", error);
        }
    };
    return (
        <View className="m-4 flex gap-4">
            <Button onPress={pickImageAsync}><Text>Select Your Video</Text></Button>
            <Video
                ref={video}
                source={{ uri: videoUri }}
                style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: 'black' }}
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
