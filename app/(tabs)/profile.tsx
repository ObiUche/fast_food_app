import {View, Text, Button,  } from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import seed from "@/lib/seed"

const Profile = () => {
    return (
        <SafeAreaView>
            <Button title="Seed" onPress={() => seed().catch((error) => console.log("Failed to seed database", error))} />
        </SafeAreaView>
    )
}
export default Profile
