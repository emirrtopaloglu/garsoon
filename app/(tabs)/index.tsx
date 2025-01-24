import React, { useState } from "react";
import { Alert, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface TableData {
  id: number;
  status: "empty" | "occupied" | "reserved";
}

interface WorkStatusButtonProps {
  isWorking: boolean;
}

interface TableCardProps {
  status: "empty" | "occupied" | "reserved";
}

const screenWidth = Dimensions.get("window").width;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #F8FAFC;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 24px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`;

const HeaderLeft = styled.View``;

const WelcomeText = styled.Text`
  font-family: 'Inter';
  font-size: 16px;
  color: #64748B;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
`;

const LogoImage = styled.Image`
  width: 160px;
  height: 48px;
  resize-mode: contain;
`;

const Title = styled.Text`
  font-family: 'Inter';
  font-size: 36px;
  font-weight: 700;
  color: #1E293B;
  letter-spacing: -0.5px;
`;

const WorkStatusButton = styled.TouchableOpacity<WorkStatusButtonProps>`
  background-color: ${(props: any) => (props.isWorking ? "#EF4444" : "#22C55E")};
  padding: 14px 24px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  shadow-color: ${(props: any) => (props.isWorking ? "#EF4444" : "#22C55E")};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 6;
`;

const WorkStatusIcon = styled(Ionicons)`
  margin-right: 10px;
`;

const WorkStatusText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.3px;
`;

const TablesContainer = styled.ScrollView`
  flex: 1;
`;

const TablesGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 10px;
`;

const TableCard = styled.TouchableOpacity<TableCardProps>`
  width: ${(screenWidth - 72) / 2}px;
  aspect-ratio: 1;
  background-color: ${(props: any) => {
    switch (props.status) {
      case "empty":
        return "#22C55E";
      case "occupied":
        return "#EF4444";
      case "reserved":
        return "#F59E0B";
      default:
        return "#E2E8F0";
    }
  }};
  border-radius: 24px;
  margin-bottom: 24px;
  padding: 28px;
  justify-content: space-between;
  shadow-color: ${(props: any) => {
    switch (props.status) {
      case "empty":
        return "#22C55E";
      case "occupied":
        return "#EF4444";
      case "reserved":
        return "#F59E0B";
      default:
        return "#E2E8F0";
    }
  }};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  elevation: 8;
  overflow: hidden;
`;

const TableGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
`;

const TableContent = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TableInfo = styled.View``;

const TableNumber = styled.Text`
  font-size: 36px;
  font-weight: 700;
  color: white;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.5px;
`;

const TableStatus = styled.Text`
  font-size: 17px;
  color: white;
  opacity: 0.95;
  letter-spacing: -0.3px;
  font-weight: 500;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const StatusBar = styled(BlurView)`
  flex-direction: row;
  justify-content: space-around;
  padding: 28px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  margin-bottom: 32px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 5;
`;

const StatusItem = styled.View`
  align-items: center;
`;

const StatusCount = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

const StatusLabel = styled.Text`
  font-size: 15px;
  color: #64748B;
  letter-spacing: -0.3px;
  font-weight: 500;
`;

const TableStatusIcon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export default function HomePage() {
  const [isWorking, setIsWorking] = useState(false);
  const [tables, setTables] = useState<TableData[]>([
    { id: 1, status: "empty" },
    { id: 2, status: "occupied" },
    { id: 3, status: "reserved" },
    { id: 4, status: "empty" },
    { id: 5, status: "empty" },
    { id: 6, status: "occupied" },
  ]);

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

  const handleTablePress = (tableId: number) => {
    if (!isWorking) {
      Alert.alert(
        "Uyarı",
        "Masaları yönetmek için çalışmaya başlamanız gerekiyor."
      );
      return;
    }
    router.push(`/(tabs)/table-management?id=${tableId}`);
  };

  const getStatusCounts = () => {
    return {
      empty: tables.filter((t) => t.status === "empty").length,
      occupied: tables.filter((t) => t.status === "occupied").length,
      reserved: tables.filter((t) => t.status === "reserved").length,
    };
  };

  const getTableStatusIcon = (status: "empty" | "occupied" | "reserved") => {
    switch (status) {
      case "empty":
        return "restaurant-outline";
      case "occupied":
        return "people";
      case "reserved":
        return "time";
      default:
        return "help-outline";
    }
  };

  const getTableGradientColors = (
    status: "empty" | "occupied" | "reserved"
  ) => {
    switch (status) {
      case "empty":
        return ["#43A047", "#2E7D32"];
      case "occupied":
        return ["#ff6b6b", "#e03131"];
      case "reserved":
        return ["#ffd93d", "#fab005"];
      default:
        return ["#e0e0e0", "#ced4da"];
    }
  };

  const statusCounts = getStatusCounts();

  return (
    <Container>
      <ContentContainer>
        <Header>
          <HeaderLeft>
            <WelcomeText>Hoş Geldiniz</WelcomeText>
            <Title>Masalar</Title>
          </HeaderLeft>
          <WorkStatusButton isWorking={isWorking} onPress={toggleWorkStatus}>
            <WorkStatusIcon
              name={isWorking ? "stop-circle" : "play"}
              size={20}
              color="white"
            />
            <WorkStatusText>
              {isWorking ? "Çalışmayı Bırak" : "İşe Başla"}
            </WorkStatusText>
          </WorkStatusButton>
        </Header>

        <StatusBar intensity={80} tint="light">
          <StatusItem>
            <StatusCount>{statusCounts.empty}</StatusCount>
            <StatusLabel>Boş Masa</StatusLabel>
          </StatusItem>
          <StatusItem>
            <StatusCount>{statusCounts.occupied}</StatusCount>
            <StatusLabel>Dolu Masa</StatusLabel>
          </StatusItem>
          <StatusItem>
            <StatusCount>{statusCounts.reserved}</StatusCount>
            <StatusLabel>Rezerve</StatusLabel>
          </StatusItem>
        </StatusBar>

        <TablesContainer showsVerticalScrollIndicator={false}>
          <TablesGrid>
            {tables.map((table) => (
              <TableCard
                key={table.id}
                status={table.status}
                onPress={() => handleTablePress(table.id)}
              >
                <TableGradient
                  colors={getTableGradientColors(table.status)}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <TableContent>
                  <TableStatusIcon>
                    <Ionicons
                      name={getTableStatusIcon(table.status)}
                      size={24}
                      color="white"
                    />
                  </TableStatusIcon>
                  <TableInfo>
                    <TableNumber>Masa {table.id}</TableNumber>
                    <TableStatus>
                      {table.status === "empty" && "Boş"}
                      {table.status === "occupied" && "Dolu"}
                      {table.status === "reserved" && "Rezerve"}
                    </TableStatus>
                  </TableInfo>
                </TableContent>
              </TableCard>
            ))}
          </TablesGrid>
        </TablesContainer>
      </ContentContainer>
    </Container>
  );
}
