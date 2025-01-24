import React, { useState } from "react";
import { Dimensions } from "react-native";
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
  time?: string;
  capacity: number;
}

const screenWidth = Dimensions.get("window").width;

const Container = styled(SafeAreaView).attrs({
  edges: ["top", "right", "left"],
})`
  flex: 1;
  background-color: #f8fafc;
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
  font-family: "Inter";
  font-size: 36px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #64748b;
  letter-spacing: -0.3px;
`;

const SearchContainer = styled(BlurView)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #1e293b;
  margin-left: 12px;
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

const TablesList = styled.ScrollView`
  flex: 1;
`;

const TableCard = styled(BlurView)`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  margin-bottom: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const TableCardContent = styled.TouchableOpacity`
  padding: 20px;
`;

const TableHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const TableInfo = styled.View`
  flex: 1;
`;

const TableTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
  letter-spacing: -0.3px;
`;

const TableCapacity = styled.Text`
  font-size: 14px;
  color: #64748b;
  letter-spacing: -0.2px;
`;

const StatusBadge = styled.View<{ status: "empty" | "occupied" | "reserved" }>`
  padding: 8px 16px;
  border-radius: 12px;
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
`;

const StatusText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const TableDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: rgba(0, 0, 0, 0.05);
`;

const DetailItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 24px;
`;

const DetailText = styled.Text`
  font-size: 14px;
  color: #64748b;
  margin-left: 8px;
`;

export default function TablesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [tables] = useState<TableData[]>([
    { id: 1, status: "empty", capacity: 4 },
    {
      id: 2,
      status: "occupied",
      orders: 3,
      total: 240,
      time: "1 saat 15 dk",
      capacity: 6,
    },
    { id: 3, status: "reserved", time: "20:30", capacity: 2 },
    { id: 4, status: "empty", capacity: 4 },
    {
      id: 5,
      status: "occupied",
      orders: 2,
      total: 180,
      time: "45 dk",
      capacity: 4,
    },
    { id: 6, status: "empty", capacity: 8 },
    { id: 7, status: "reserved", time: "21:00", capacity: 6 },
    {
      id: 8,
      status: "occupied",
      orders: 4,
      total: 320,
      time: "2 saat",
      capacity: 4,
    },
  ]);

  const filters = [
    { id: "all", label: "Tümü" },
    { id: "empty", label: "Boş" },
    { id: "occupied", label: "Dolu" },
    { id: "reserved", label: "Rezerve" },
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case "empty":
        return "Boş";
      case "occupied":
        return "Dolu";
      case "reserved":
        return "Rezerve";
      default:
        return "";
    }
  };

  const filteredTables = tables
    .filter((table) => {
      if (activeFilter === "all") return true;
      return table.status === activeFilter;
    })
    .filter((table) => {
      if (!searchQuery) return true;
      return table.id.toString().includes(searchQuery);
    });

  return (
    <Container>
      <ContentContainer>
        <Header>
          <Title>Masalar</Title>
          <Subtitle>Tüm masaların durumunu görüntüleyin</Subtitle>
        </Header>

        <SearchContainer intensity={80}>
          <Ionicons name="search-outline" size={20} color="#64748B" />
          <SearchInput
            placeholder="Masa ara..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </SearchContainer>

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

        <TablesList showsVerticalScrollIndicator={false}>
          {filteredTables.map((table) => (
            <TableCard key={table.id} intensity={80}>
              <TableCardContent
                onPress={() => router.push(`/table-management?id=${table.id}`)}
              >
                <TableHeader>
                  <TableInfo>
                    <TableTitle>Masa {table.id}</TableTitle>
                    <TableCapacity>{table.capacity} Kişilik</TableCapacity>
                  </TableInfo>
                  <StatusBadge status={table.status}>
                    <StatusText>{getStatusText(table.status)}</StatusText>
                  </StatusBadge>
                </TableHeader>

                {table.status !== "empty" && (
                  <TableDetails>
                    {table.status === "occupied" && (
                      <>
                        <DetailItem>
                          <Ionicons
                            name="time-outline"
                            size={16}
                            color="#64748B"
                          />
                          <DetailText>{table.time}</DetailText>
                        </DetailItem>
                        <DetailItem>
                          <Ionicons
                            name="receipt-outline"
                            size={16}
                            color="#64748B"
                          />
                          <DetailText>{table.orders} Sipariş</DetailText>
                        </DetailItem>
                        <DetailItem>
                          <Ionicons
                            name="wallet-outline"
                            size={16}
                            color="#64748B"
                          />
                          <DetailText>{table.total} TL</DetailText>
                        </DetailItem>
                      </>
                    )}
                    {table.status === "reserved" && (
                      <DetailItem>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color="#64748B"
                        />
                        <DetailText>Rezervasyon: {table.time}</DetailText>
                      </DetailItem>
                    )}
                  </TableDetails>
                )}
              </TableCardContent>
            </TableCard>
          ))}
        </TablesList>
      </ContentContainer>
    </Container>
  );
}
