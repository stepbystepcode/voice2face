import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import {Text} from "~/components/ui/text";
import { Link } from 'expo-router';
export default function Screen() {

  return (
      <View className='flex flex-row flex-wrap gap-4 m-4 justify-center items-center'>
        {Array.from({length: 4}, (_, i) => i).map((i) => (
            <Link key={i} href="/exec" asChild><Button className='w-1/3' ><Text>Mode {i+1}</Text></Button></Link>
        ))}
      </View>
  );
}
