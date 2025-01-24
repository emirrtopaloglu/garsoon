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
  orders?: number;
  total?: number;
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
  padding-bottom: 100px;
`;

const Header = styled.View`
  margin-bottom: 32px;
`;

const WelcomeContainer = styled(BlurView)`
  padding: 24px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 24px;
`;

const WelcomeHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const WelcomeLeft = styled.View``;

const WelcomeText = styled.Text`
  font-family: 'Inter';
  font-size: 16px;
  color: #64748B;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
`;

const Title = styled.Text`
  font-family: 'Inter';
  font-size: 32px;
  font-weight: 700;
  color: #1E293B;
  letter-spacing: -0.5px;
`;

const WorkStatusButton = styled.TouchableOpacity<WorkStatusButtonProps>`
  background-color: ${(props: any) => (props.isWorking ? "#EF4444" : "#22C55E")};
  padding: 12px 20px;
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
  margin-right: 8px;
`;

const WorkStatusText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.3px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StatItem = styled.View`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 16px;
  border-radius: 16px;
  min-width: 90px;
`;

const StatCount = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 4px;
`;

const StatLabel = styled.Text`
  font-size: 13px;
  color: #64748B;
  letter-spacing: -0.2px;
`;

const FilterContainer = styled.ScrollView`
  margin-bottom: 24px;
  flex-grow: 0;
`;

const FilterButton = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: 12px 20px;
  background-color: ${(props: any) => (props.isActive ? "#22C55E" : "white")};
  border-radius: 12px;
  margin-right: 12px;
  shadow-color: ${(props: any) => (props.isActive ? "#22C55E" : "#000")};
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props: any) => (props.isActive ? 0.2 : 0.05)};
  shadow-radius: 8px;
  elevation: 3;
`;

const FilterText = styled.Text<{ isActive: boolean }>`
  color: ${(props: any) => (props.isActive ? "white" : "#64748B")};
  font-size: 14px;
  font-weight: 600;
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
  padding: 24px;
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
  const [activeFilter, setActiveFilter] = useState("all");
  const [tables, setTables] = useState<TableData[]>([
    { id: 1, status: "empty" },
    { id: 2, status: "occupied", orders: 3, total: 240 },
    { id: 3, status: "reserved" },
    { id: 4, status: "empty" },
    { id: 5, status: "occupied", orders: 2, total: 180 },
    { id: 6, status: "empty" },
  ]);

  const filters = [
    { id: "all", label: "Tümü" },
    { id: "empty", label: "Boş" },
    { id: "occupied", label: "Dolu" },
    { id: "reserved", label: "Rezerve" },
  ];

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

  const filteredTables = tables.filter((table) => {
    if (activeFilter === "all") return true;
    return table.status === activeFilter;
  });

  const statusCounts = getStatusCounts();

  return (
    <Container>
      <ContentContainer>
        <WelcomeContainer intensity={80}>
          <WelcomeHeader>
            <WelcomeLeft>
              <WelcomeText>Hoş Geldiniz</WelcomeText>
              <Title>Masalar</Title>
            </WelcomeLeft>
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
          </WelcomeHeader>

          <StatsContainer>
            <StatItem>
              <StatCount>{statusCounts.empty}</StatCount>
              <StatLabel>Boş Masa</StatLabel>
            </StatItem>
            <StatItem>
              <StatCount>{statusCounts.occupied}</StatCount>
              <StatLabel>Dolu Masa</StatLabel>
            </StatItem>
            <StatItem>
              <StatCount>{statusCounts.reserved}</StatCount>
              <StatLabel>Rezerve</StatLabel>
            </StatItem>
          </StatsContainer>
        </WelcomeContainer>

        <FilterContainer horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              isActive={activeFilter === filter.id}
              onPress={() => setActiveFilter(filter.id)}
            >
              <FilterText isActive={activeFilter === filter.id}>
                {filter.label}
              </FilterText>
            </FilterButton>
          ))}
        </FilterContainer>

        <TablesContainer showsVerticalScrollIndicator={false}>
          <TablesGrid>
            {filteredTables.map((table) => (
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
