import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  status: "active" | "inactive";
  avatar: string;
}

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

const StaffList = styled.FlatList`
  flex: 1;
`;

const StaffCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 16px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 3;
`;

const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-right: 16px;
`;

const StaffInfo = styled.View`
  flex: 1;
`;

const StaffName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
  letter-spacing: -0.3px;
`;

const StaffRole = styled.Text`
  font-size: 15px;
  color: #64748b;
  letter-spacing: -0.2px;
`;

const StatusBadge = styled.View<{ status: "active" | "inactive" }>`
  padding: 6px 12px;
  border-radius: 20px;
  background-color: ${(props: any) =>
    props.status === "active" ? "#06ef7f" : "#94A3B8"};
`;

const StatusText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

const AddButton = styled.TouchableOpacity`
  position: absolute;
  right: 24px;
  bottom: 100px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #06ef7f;
  justify-content: center;
  align-items: center;
  shadow-color: #06ef7f;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 6;
  z-index: 999;
`;

export default function StaffScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [staffMembers] = useState<StaffMember[]>([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      role: "Garson",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Ayşe Demir",
      role: "Şef Garson",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      role: "Garson",
      status: "inactive",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ]);

  const renderStaffCard = ({ item }: { item: StaffMember }) => (
    <StaffCard>
      <Avatar source={{ uri: item.avatar }} />
      <StaffInfo>
        <StaffName>{item.name}</StaffName>
        <StaffRole>{item.role}</StaffRole>
      </StaffInfo>
      <StatusBadge status={item.status}>
        <StatusText>{item.status === "active" ? "Aktif" : "Pasif"}</StatusText>
      </StatusBadge>
    </StaffCard>
  );

  return (
    <Container>
      <ContentContainer>
        <Header>
          <Title>Personel</Title>
          <Subtitle>Personel listesi ve yönetimi</Subtitle>
        </Header>

        <SearchContainer intensity={80}>
          <Ionicons name="search-outline" size={20} color="#64748B" />
          <SearchInput
            placeholder="Personel ara..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </SearchContainer>

        <StaffList
          data={staffMembers}
          renderItem={renderStaffCard}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />

        <AddButton>
          <Ionicons name="add" size={32} color="white" />
        </AddButton>
      </ContentContainer>
    </Container>
  );
}
