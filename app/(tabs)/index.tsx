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
  status: "empty" | "occupied";
  orders?: number;
  total?: number;
}

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
  margin-bottom: 8px;
  letter-spacing: -0.3px;
`;

const Title = styled.Text`
  font-family: "Inter";
  font-size: 36px;
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
  margin-bottom: 32px;
  flex-grow: 0;
`;

const FilterButton = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: 12px 24px;
  background-color: ${(props: any) => (props.isActive ? "#06ef7f" : "#fff")};
  border-radius: 14px;
  margin-right: 12px;
  elevation: 6;
  border: 1px solid
    ${(props: any) => (props.isActive ? "#06ef7f" : "rgba(0,0,0,0.03)")};
`;

const FilterText = styled.Text<{ isActive: boolean }>`
  color: ${(props: any) => (props.isActive ? "#FFFFFF" : "#64748B")};
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
  border-radius: 32px;
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
    ${(props: any) =>
      props.status === "empty" ? "rgba(0,0,0,0.03)" : "transparent"};
`;

const TableContent = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TableInfo = styled.View``;

const TableNumber = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${(props: any) => (props.status === "empty" ? "#1E293B" : "white")};
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
  margin-bottom: 8px;
`;

const TableStatus = styled.Text`
  font-size: 16px;
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
  const [activeFilter, setActiveFilter] = useState("all");
  const [tables, setTables] = useState<TableData[]>([
    { id: 1, status: "empty" },
    { id: 2, status: "occupied", orders: 3, total: 240 },
    { id: 3, status: "empty" },
    { id: 4, status: "empty" },
    { id: 5, status: "occupied", orders: 2, total: 180 },
    { id: 6, status: "empty" },
  ]);

  const filters = [
    { id: "all", label: "Tümü" },
    { id: "empty", label: "Boş" },
    { id: "occupied", label: "Dolu" },
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
    };
  };

  const getTableStatusIcon = (status: "empty" | "occupied") => {
    switch (status) {
      case "empty":
        return "restaurant-outline";
      case "occupied":
        return "people";
      default:
        return "help-outline";
    }
  };

  const getTableGradientColors = (status: "empty" | "occupied") => {
    switch (status) {
      case "empty":
        return ["#FFFFFF", "#F8FAFC"];
      case "occupied":
        return ["#FB923C", "#F97316"];
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
                size={24}
                color="white"
              />
              <WorkStatusText>
                {isWorking ? "Çalışmayı Bırak" : "İşe Başla"}
              </WorkStatusText>
            </WorkStatusButton>
          </WelcomeHeader>
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
                <TableContent>
                  <TableStatusIcon status={table.status}>
                    <Ionicons
                      name={getTableStatusIcon(table.status)}
                      size={28}
                      color={table.status === "empty" ? "#64748B" : "white"}
                    />
                  </TableStatusIcon>
                  <TableInfo>
                    <TableNumber status={table.status}>
                      Masa {table.id}
                    </TableNumber>
                    <TableStatus status={table.status}>
                      {table.status === "empty" && "Boş"}
                      {table.status === "occupied" && "Dolu"}
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
