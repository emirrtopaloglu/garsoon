import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const Container = styled(SafeAreaView).attrs({
  edges: ['top', 'right', 'left']
})`
  flex: 1;
  background-color: #F8FAFC;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 24px;
  padding-bottom: 100px;
`;

const Header = styled.View`
  margin-bottom: 32px;
`;

const Title = styled.Text`
  font-family: 'Inter';
  font-size: 36px;
  font-weight: 700;
  color: #1E293B;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #64748B;
  letter-spacing: -0.3px;
`;

const Section = styled.View`
  margin-bottom: 32px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
`;

const SettingCard = styled(BlurView)`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 16px;
`;

const SettingItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.05);
`;

const SettingIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: #06ef7f;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const SettingInfo = styled.View`
  flex: 1;
`;

const SettingTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #1E293B;
  margin-bottom: 4px;
  letter-spacing: -0.3px;
`;

const SettingDescription = styled.Text`
  font-size: 14px;
  color: #64748B;
  letter-spacing: -0.2px;
`;

const Version = styled.Text`
  text-align: center;
  color: #94A3B8;
  font-size: 14px;
  margin-top: 16px;
`;

export default function SettingsScreen() {
  return (
    <Container>
      <ContentContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <Title>Ayarlar</Title>
            <Subtitle>Uygulama ayarlarını yönetin</Subtitle>
          </Header>

          <Section>
            <SectionTitle>Genel</SectionTitle>
            <SettingCard intensity={80}>
              <SettingItem>
                <SettingIcon>
                  <Ionicons name="notifications-outline" size={24} color="white" />
                </SettingIcon>
                <SettingInfo>
                  <SettingTitle>Bildirimler</SettingTitle>
                  <SettingDescription>Bildirim tercihlerini yönetin</SettingDescription>
                </SettingInfo>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </SettingItem>

              <SettingItem>
                <SettingIcon>
                  <Ionicons name="language-outline" size={24} color="white" />
                </SettingIcon>
                <SettingInfo>
                  <SettingTitle>Dil</SettingTitle>
                  <SettingDescription>Uygulama dilini değiştirin</SettingDescription>
                </SettingInfo>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </SettingItem>
            </SettingCard>
          </Section>

          <Section>
            <SectionTitle>Hesap</SectionTitle>
            <SettingCard intensity={80}>
              <SettingItem>
                <SettingIcon>
                  <Ionicons name="person-outline" size={24} color="white" />
                </SettingIcon>
                <SettingInfo>
                  <SettingTitle>Profil</SettingTitle>
                  <SettingDescription>Profil bilgilerinizi düzenleyin</SettingDescription>
                </SettingInfo>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </SettingItem>

              <SettingItem>
                <SettingIcon>
                  <Ionicons name="lock-closed-outline" size={24} color="white" />
                </SettingIcon>
                <SettingInfo>
                  <SettingTitle>Güvenlik</SettingTitle>
                  <SettingDescription>Şifre ve güvenlik ayarları</SettingDescription>
                </SettingInfo>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </SettingItem>
            </SettingCard>
          </Section>

          <Section>
            <SectionTitle>Diğer</SectionTitle>
            <SettingCard intensity={80}>
              <SettingItem>
                <SettingIcon>
                  <Ionicons name="help-circle-outline" size={24} color="white" />
                </SettingIcon>
                <SettingInfo>
                  <SettingTitle>Yardım</SettingTitle>
                  <SettingDescription>SSS ve destek</SettingDescription>
                </SettingInfo>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </SettingItem>

              <SettingItem>
                <SettingIcon>
                  <Ionicons name="information-circle-outline" size={24} color="white" />
                </SettingIcon>
                <SettingInfo>
                  <SettingTitle>Hakkında</SettingTitle>
                  <SettingDescription>Uygulama bilgileri</SettingDescription>
                </SettingInfo>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </SettingItem>
            </SettingCard>
          </Section>

          <Version>Versiyon 1.0.0</Version>
        </ScrollView>
      </ContentContainer>
    </Container>
  );
} 