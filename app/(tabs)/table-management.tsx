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
  extras?: number[];
  note?: string;
}

interface ExtraOption {
  id: number;
  name: string;
  price: number;
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
  align-items: center;
  margin-bottom: 24px;
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
  overflow: hidden;
  padding-bottom: 32px;
`;

const CardContent = styled.View``;

const Section = styled.View``;

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
  flex-direction: column;
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

const OrderItemTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props: any) => (props.hasExtras ? "12px" : "0")};
`;

const OrderItemLeft = styled.View`
  flex: 1;
`;

const OrderItemExtras = styled.View`
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 12px;
`;

const OrderItemExtraText = styled.Text`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 4px;
`;

const OrderItemNote = styled.Text`
  font-size: 14px;
  color: #64748b;
  font-style: italic;
  margin-top: 8px;
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

const extraOptions: ExtraOption[] = [
  { id: 1, name: "Mısır", price: 5 },
  { id: 2, name: "Mantar", price: 5 },
  { id: 3, name: "Sucuk", price: 10 },
  { id: 4, name: "Zeytin", price: 5 },
  { id: 5, name: "Biber", price: 5 },
  { id: 6, name: "Soğan", price: 5 },
];

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
          <BackButton onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </BackButton>
          <Title>Masa {tableId}</Title>
          <Subtitle>
            {tableStatus === "empty" && "Boş"}
            {tableStatus === "occupied" && "Dolu"}
            {tableStatus === "reserved" && "Rezerve"}
          </Subtitle>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Card intensity={80} tint="light">
            <CardContent>
              <Section>
                <SectionTitle>Ürünler</SectionTitle>
                {orders.map((order) => (
                  <OrderItemCard key={order.id}>
                    <OrderItemTop
                      hasExtras={Boolean(order.extras?.length || order.note)}
                    >
                      <OrderItemLeft>
                        <OrderItemText>{order.name}</OrderItemText>
                        <OrderItemQuantity>
                          {order.quantity} Adet
                        </OrderItemQuantity>
                      </OrderItemLeft>
                      <OrderItemPrice>{order.price} TL</OrderItemPrice>
                    </OrderItemTop>

                    {(Boolean(order.extras?.length) || order.note) && (
                      <OrderItemExtras>
                        {order.extras && order.extras.length > 0 && (
                          <OrderItemExtraText>
                            Ekstralar:{" "}
                            {order.extras
                              .map((extraId) => {
                                const extraOption = extraOptions.find(
                                  (opt) => opt.id === extraId
                                );
                                return extraOption ? extraOption.name : "";
                              })
                              .join(", ")}
                          </OrderItemExtraText>
                        )}
                        {order.note && (
                          <OrderItemNote>Not: {order.note}</OrderItemNote>
                        )}
                      </OrderItemExtras>
                    )}
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
                <ButtonText>Yeni Ürün Ekle</ButtonText>
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
