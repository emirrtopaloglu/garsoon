import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLogin } from "./api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f8f9fa;
`;

const Background = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoginCard = styled.View`
  width: 90%;
  max-width: 400px;
  background-color: white;
  border-radius: 24px;
  padding: 32px;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.08;
  shadow-radius: 16px;
  elevation: 8;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

const LogoIcon = styled.View`
  width: 72px;
  height: 72px;
  background-color: #4caf50;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  shadow-color: #4caf50;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 5;
`;

const LogoImage = styled.Image`
  width: 200px;
  height: 60px;
  resize-mode: contain;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: #666;
  margin-top: 8px;
  text-align: center;
  letter-spacing: 0.5px;
`;

const InputContainer = styled.View`
  margin-bottom: 24px;
`;

const InputWrapper = styled.View`
  margin-bottom: 20px;
`;

const InputLabel = styled.Text`
  font-size: 15px;
  color: #444;
  margin-bottom: 8px;
  margin-left: 4px;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const InputField = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  border: 1.5px solid #e9ecef;
  padding: 4px;
`;

const InputIcon = styled.View`
  width: 46px;
  height: 46px;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 14px;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 46px;
  padding: 0 16px;
  font-size: 16px;
  color: #1a1a1a;
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  background-color: #4caf50;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 16px;
  shadow-color: #4caf50;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 5;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: bold;
  margin-left: 8px;
  letter-spacing: 0.5px;
`;

const ForgotPassword = styled.TouchableOpacity`
  align-items: center;
  margin-top: 24px;
  padding: 8px;
`;

const ForgotPasswordText = styled.Text`
  color: #666;
  font-size: 15px;
  letter-spacing: 0.5px;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();

  const handleLogin = () => {
    if (username && password) {
      login(
        { username, password },
        {
          onSuccess: async (data: { token: string; user: any }) => {
            await AsyncStorage.setItem("token", data.token);
            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            router.replace("/(tabs)");
          },
          onError: (error: Error) => {
            Alert.alert(
              "Hata",
              "Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin."
            );
          },
        }
      );
    } else {
      Alert.alert("Hata", "Lütfen kullanıcı adı ve şifrenizi giriniz.");
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Background>
          <LoginCard>
            <LogoContainer>
              <LogoImage
                source={{
                  uri: "https://chekzpoint.com/chekzpoint-logo-with-name.png",
                }}
              />
              <Subtitle>Restoran Yönetim Sistemi</Subtitle>
            </LogoContainer>

            <InputContainer>
              <InputWrapper>
                <InputLabel>Kullanıcı Adı</InputLabel>
                <InputField>
                  <InputIcon>
                    <Ionicons name="person-outline" size={22} color="#666" />
                  </InputIcon>
                  <Input
                    placeholder="Kullanıcı adınızı giriniz"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#999"
                  />
                </InputField>
              </InputWrapper>

              <InputWrapper>
                <InputLabel>Şifre</InputLabel>
                <InputField>
                  <InputIcon>
                    <Ionicons
                      name="lock-closed-outline"
                      size={22}
                      color="#666"
                    />
                  </InputIcon>
                  <Input
                    placeholder="Şifrenizi giriniz"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                  />
                </InputField>
              </InputWrapper>
            </InputContainer>

            <LoginButton onPress={handleLogin}>
              <Ionicons name="log-in-outline" size={22} color="white" />
              <ButtonText>Giriş Yap</ButtonText>
            </LoginButton>

            <ForgotPassword
              onPress={() =>
                Alert.alert(
                  "Bilgi",
                  "Lütfen yöneticiniz ile iletişime geçiniz."
                )
              }
            >
              <ForgotPasswordText>Şifremi Unuttum</ForgotPasswordText>
            </ForgotPassword>
          </LoginCard>
        </Background>
      </KeyboardAvoidingView>
    </Container>
  );
}
