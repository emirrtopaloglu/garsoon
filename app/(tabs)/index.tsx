import React, { useState } from "react";
import { Alert, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface WorkStatusButtonProps {
  isWorking: boolean;
}

interface TableCardProps {
  status: "empty" | "occupied";
}

const screenWidth = Dimensions.get("window").width;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 24px;
  padding-bottom: 48px;
`;

const WelcomeContainer = styled(BlurView)`
  border-radius: 32px;
  margin-bottom: 32px;
`;

const WelcomeHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WelcomeLeft = styled.View``;

const WelcomeText = styled.Text`
  font-family: "Inter";
  font-size: 18px;
  color: #64748b;
  letter-spacing: -0.3px;
`;

const Title = styled.Text`
  font-family: "Inter";
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
`;

const WorkStatusButton = styled.TouchableOpacity<WorkStatusButtonProps>`
  background-color: ${(props: any) =>
    props.isWorking ? "#ff4757" : "#06ef7f"};
  padding: 14px 24px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  shadow-color: ${(props: any) => (props.isWorking ? "#ff4757" : "#06ef7f")};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  elevation: 8;
`;

const WorkStatusIcon = styled(Ionicons)`
  margin-right: 10px;
`;

const WorkStatusText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.3px;
`;

const FilterContainer = styled.ScrollView`
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  border-style: solid;
  flex-grow: 0;
`;

const FilterButton = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: 12px 24px;
  border-color: ${(props: any) => (props.isActive ? "#06ef7f" : "#fff")};
  border-radius: 14px;
  margin-right: 12px;
  elevation: 6;
  border-bottom-width: 2px;
  border-bottom-color: ${(props: any) =>
    props.isActive ? "#06ef7f" : "transparent"};
`;

const FilterText = styled.Text<{ isActive: boolean }>`
  color: ${(props: any) => (props.isActive ? "#06ef7f" : "#64748B")};
  font-size: 15px;
  font-weight: 700;
`;

const TablesContainer = styled.ScrollView`
  flex: 1;
`;

const TablesGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TableCard = styled.TouchableOpacity<TableCardProps>`
  width: ${(screenWidth - 72) / 2}px;
  aspect-ratio: 1;
  background-color: ${(props: any) => {
    switch (props.status) {
      case "empty":
        return "#FFFFFF";
      case "occupied":
        return "#FB923C";
      default:
        return "#F8FAFC";
    }
  }};
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 24px;
  justify-content: space-between;
  shadow-color: ${(props: any) => {
    switch (props.status) {
      case "empty":
        return "#000000";
      case "occupied":
        return "#FB923C";
      default:
        return "#000000";
    }
  }};
  shadow-offset: 0px 8px;
  shadow-opacity: ${(props: any) => (props.status === "occupied" ? 0.3 : 0.08)};
  shadow-radius: 16px;
  elevation: 10;
  border: 1px solid
    ${(props: any) => (props.status === "empty" ? "#f5f5f5" : "transparent")};
`;

const TableContent = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TableInfo = styled.View``;

const TableNumber = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props: any) => (props.status === "empty" ? "#1E293B" : "white")};
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
  margin-bottom: 8px;
`;

const TableStatus = styled.Text`
  font-size: 14px;
  color: ${(props: any) => (props.status === "empty" ? "#64748B" : "white")};
  opacity: 0.9;
  letter-spacing: -0.3px;
  font-weight: 600;
`;

const TableStatusIcon = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background-color: ${(props: any) =>
    props.status === "empty" ? "#F8FAFC" : "rgba(255, 255, 255, 0.2)"};
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  border: 1px solid
    ${(props: any) =>
      props.status === "empty"
        ? "rgba(0,0,0,0.03)"
        : "rgba(255, 255, 255, 0.2)"};
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
`;

export default function HomePage() {
  const [isWorking, setIsWorking] = useState(false);

  const toggleWorkStatus = () => {
    if (isWorking) {
      Alert.alert(
        "Çalışmayı Bırak",
        "Çalışmayı bırakmak istediğinizden emin misiniz?",
        [
          { text: "İptal", style: "cancel" },
          {
            text: "Evet",
            onPress: () => {
              setIsWorking(false);
              Alert.alert("Bilgi", "Çalışma durumunuz kapatıldı.");
            },
          },
        ]
      );
    } else {
      setIsWorking(true);
      Alert.alert("Bilgi", "Çalışmaya başladınız!");
    }
  };
  return (
    <Container>
      <ContentContainer>
        <WelcomeContainer intensity={80}>
          <WelcomeHeader>
            <WelcomeLeft>
              <WelcomeText>Hoş Geldiniz</WelcomeText>
              <Title>Anasayfa</Title>
            </WelcomeLeft>
            <WorkStatusButton isWorking={isWorking} onPress={toggleWorkStatus}>
              <WorkStatusIcon
                name={isWorking ? "stop-circle" : "play"}
                size={24}
                color="white"
              />
              <WorkStatusText>
                {isWorking ? "Çalışmayı Bırak" : "İşe Başla"}
              </WorkStatusText>
            </WorkStatusButton>
          </WelcomeHeader>
        </WelcomeContainer>
      </ContentContainer>
    </Container>
  );
}
