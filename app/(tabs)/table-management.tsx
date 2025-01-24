import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import AddOrderModal from "../components/AddOrderModal";

interface ButtonProps {
  variant?: "danger" | "default";
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f8f9fa;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const HeaderLeft = styled.View`
  flex: 1;
`;

const BackButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #1a1a1a;
  letter-spacing: 0.5px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: #666;
  margin-top: 4px;
  letter-spacing: 0.5px;
`;

const Card = styled(BlurView)`
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardContent = styled.View`
  padding: 24px;
`;

const Section = styled.View`
  margin-bottom: 24px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
`;

const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props: any) =>
    props.variant === "danger" ? "#ff6b6b" : "#4CAF50"};
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  shadow-color: ${(props: any) =>
    props.variant === "danger" ? "#ff6b6b" : "#4CAF50"};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.25;
  shadow-radius: 12px;
  elevation: 8;
  overflow: hidden;
`;

const ButtonGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ButtonIcon = styled(Ionicons)`
  margin-right: 8px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.5px;
`;

const OrderItemCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 16px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

const OrderItemLeft = styled.View`
  flex: 1;
`;

const OrderItemText = styled.Text`
  font-size: 17px;
  color: #1a1a1a;
  margin-bottom: 6px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const OrderItemQuantity = styled.Text`
  font-size: 15px;
  color: #666;
  letter-spacing: 0.3px;
`;

const OrderItemPrice = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #1a1a1a;
  letter-spacing: 0.3px;
`;

const TotalSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 16px;
  margin-top: 16px;
`;

const TotalText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1a1a1a;
  letter-spacing: 0.5px;
`;

export default function TableManagement() {
  const params = useLocalSearchParams();
  const tableId = params.id;

  const [tableStatus, setTableStatus] = useState<
    "empty" | "occupied" | "reserved"
  >("occupied");
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: 1, name: "Karışık Pizza", price: 120, quantity: 1 },
    { id: 2, name: "Kola", price: 15, quantity: 1 },
    { id: 3, name: "Tiramisu", price: 45, quantity: 1 },
  ]);
  const [isAddOrderModalVisible, setIsAddOrderModalVisible] = useState(false);

  const calculateTotal = () => {
    return orders.reduce((total, item) => total + item.price, 0);
  };

  const handleStatusChange = (newStatus: "empty" | "occupied" | "reserved") => {
    Alert.alert(
      "Durum Değişikliği",
      `Masa durumunu "${newStatus}" olarak değiştirmek istiyor musunuz?`,
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Evet",
          onPress: () => {
            setTableStatus(newStatus);
            Alert.alert("Bilgi", "Masa durumu güncellendi.");
          },
        },
      ]
    );
  };

  const handleAddOrder = (order: {
    name: string;
    price: number;
    quantity: number;
  }) => {
    const newOrder: OrderItem = {
      id: orders.length + 1,
      name: order.name,
      price: order.price,
      quantity: order.quantity,
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const handlePayment = () => {
    Alert.alert("Ödeme Al", "Ödemeyi tamamlamak istiyor musunuz?", [
      { text: "İptal", style: "cancel" },
      {
        text: "Evet",
        onPress: () => {
          setOrders([]);
          setTableStatus("empty");
          Alert.alert("Başarılı", "Ödeme tamamlandı ve masa boşaltıldı.");
        },
      },
    ]);
  };

  const getButtonGradientColors = (variant?: "danger" | "default") => {
    return variant === "danger"
      ? ["#ff6b6b", "#e03131"]
      : ["#43A047", "#2E7D32"];
  };

  return (
    <Container>
      <ContentContainer>
        <Header>
          <HeaderLeft>
            <BackButton onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
            </BackButton>
            <Title>Masa {tableId}</Title>
            <Subtitle>
              {tableStatus === "empty" && "Boş"}
              {tableStatus === "occupied" && "Dolu"}
              {tableStatus === "reserved" && "Rezerve"}
            </Subtitle>
          </HeaderLeft>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Card intensity={80} tint="light">
            <CardContent>
              <Section>
                <SectionTitle>Masa Durumu</SectionTitle>
                <Button onPress={() => handleStatusChange("empty")}>
                  <ButtonGradient
                    colors={getButtonGradientColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                  <ButtonIcon
                    name="restaurant-outline"
                    size={20}
                    color="white"
                  />
                  <ButtonText>Boşalt</ButtonText>
                </Button>
                <Button onPress={() => handleStatusChange("reserved")}>
                  <ButtonGradient
                    colors={getButtonGradientColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                  <ButtonIcon name="time" size={20} color="white" />
                  <ButtonText>Rezerve Et</ButtonText>
                </Button>
              </Section>

              <Section>
                <SectionTitle>Siparişler</SectionTitle>
                {orders.map((order) => (
                  <OrderItemCard key={order.id}>
                    <OrderItemLeft>
                      <OrderItemText>{order.name}</OrderItemText>
                      <OrderItemQuantity>
                        {order.quantity} Adet
                      </OrderItemQuantity>
                    </OrderItemLeft>
                    <OrderItemPrice>{order.price} TL</OrderItemPrice>
                  </OrderItemCard>
                ))}
                <TotalSection>
                  <TotalText>Toplam</TotalText>
                  <TotalText>{calculateTotal()} TL</TotalText>
                </TotalSection>
              </Section>

              <Button onPress={() => setIsAddOrderModalVisible(true)}>
                <ButtonGradient
                  colors={getButtonGradientColors()}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <ButtonIcon name="add-circle-outline" size={20} color="white" />
                <ButtonText>Yeni Sipariş Ekle</ButtonText>
              </Button>

              <Button variant="danger" onPress={handlePayment}>
                <ButtonGradient
                  colors={getButtonGradientColors("danger")}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <ButtonIcon name="card-outline" size={20} color="white" />
                <ButtonText>Ödeme Al</ButtonText>
              </Button>
            </CardContent>
          </Card>
        </ScrollView>

        <AddOrderModal
          visible={isAddOrderModalVisible}
          onClose={() => setIsAddOrderModalVisible(false)}
          onAddOrder={handleAddOrder}
        />
      </ContentContainer>
    </Container>
  );
}
