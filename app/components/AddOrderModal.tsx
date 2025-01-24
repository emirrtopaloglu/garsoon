import React, { useState } from 'react';
import { Modal, ScrollView, TouchableOpacity, Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;

interface AddOrderModalProps {
  visible: boolean;
  onClose: () => void;
  onAddOrder: (order: { name: string; price: number; quantity: number }) => void;
}

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled(BlurView)`
  background-color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  max-height: ${screenHeight * 0.8}px;
`;

const ModalScrollContent = styled.ScrollView`
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px 20px 0;
  background-color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1a;
  letter-spacing: 0.5px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f8f9fa;
  justify-content: center;
  align-items: center;
`;

const CategoryListContainer = styled.View`
  margin-bottom: 20px;
  padding: 0 20px;
  background-color: white;
`;

const CategoryList = styled.ScrollView`
  flex-grow: 0;
`;

const CategoryButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding: 12px 20px;
  background-color: ${(props: any) =>
    props.isSelected ? "#4CAF50" : "#f8f9fa"};
  border-radius: 12px;
  margin-right: 12px;
`;

const CategoryText = styled.Text<{ isSelected: boolean }>`
  color: ${(props: any) => props.isSelected ? 'white' : '#666'};
  font-weight: ${(props: any) => props.isSelected ? 'bold' : 'normal'};
  font-size: 15px;
`;

const MenuList = styled.View`
  margin-bottom: 20px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-radius: 16px;
  margin-bottom: 12px;
  border: 2px solid #f1f3f5;
`;

const MenuItemInfo = styled.View`
  flex: 1;
`;

const MenuItemName = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const MenuItemPrice = styled.Text`
  font-size: 15px;
  color: #666;
`;

const QuantityControl = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 4px;
`;

const QuantityButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
`;

const QuantityText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0 12px;
`;

const AddButton = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: #4CAF50;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  shadow-color: #4CAF50;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

const AddButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const categories = [
  'Tümü',
  'Pizza',
  'Hamburger',
  'İçecekler',
  'Tatlılar',
  'Salatalar'
];

const menuItems = [
  { id: 1, name: 'Karışık Pizza', price: 120, category: 'Pizza' },
  { id: 2, name: 'Margarita Pizza', price: 100, category: 'Pizza' },
  { id: 3, name: 'Cheeseburger', price: 80, category: 'Hamburger' },
  { id: 4, name: 'Kola', price: 15, category: 'İçecekler' },
  { id: 5, name: 'Ayran', price: 10, category: 'İçecekler' },
  { id: 6, name: 'Tiramisu', price: 45, category: 'Tatlılar' },
  { id: 7, name: 'Cheesecake', price: 50, category: 'Tatlılar' },
  { id: 8, name: 'Akdeniz Salata', price: 40, category: 'Salatalar' },
];

export default function AddOrderModal({ visible, onClose, onAddOrder }: AddOrderModalProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const filteredItems = selectedCategory === 'Tümü'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const handleQuantityChange = (itemId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddOrder = () => {
    const selectedItems = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        const item = menuItems.find(m => m.id === parseInt(itemId));
        return {
          name: item!.name,
          price: item!.price * quantity,
          quantity
        };
      });

    if (selectedItems.length > 0) {
      selectedItems.forEach(item => onAddOrder(item));
      onClose();
      setQuantities({});
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalContent intensity={100} tint="light">
          <Header>
            <Title>Yeni Sipariş</Title>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </CloseButton>
          </Header>

          <CategoryListContainer>
            <CategoryList horizontal showsHorizontalScrollIndicator={false}>
              {categories.map(category => (
                <CategoryButton
                  key={category}
                  isSelected={category === selectedCategory}
                  onPress={() => setSelectedCategory(category)}
                >
                  <CategoryText isSelected={category === selectedCategory}>
                    {category}
                  </CategoryText>
                </CategoryButton>
              ))}
            </CategoryList>
          </CategoryListContainer>

          <ModalScrollContent showsVerticalScrollIndicator={false}>
            <MenuList>
              {filteredItems.map(item => (
                <MenuItem key={item.id}>
                  <MenuItemInfo>
                    <MenuItemName>{item.name}</MenuItemName>
                    <MenuItemPrice>{item.price} TL</MenuItemPrice>
                  </MenuItemInfo>
                  <QuantityControl>
                    <QuantityButton onPress={() => handleQuantityChange(item.id, -1)}>
                      <Ionicons name="remove" size={20} color="#666" />
                    </QuantityButton>
                    <QuantityText>{quantities[item.id] || 0}</QuantityText>
                    <QuantityButton onPress={() => handleQuantityChange(item.id, 1)}>
                      <Ionicons name="add" size={20} color="#666" />
                    </QuantityButton>
                  </QuantityControl>
                </MenuItem>
              ))}
            </MenuList>

            <AddButton onPress={handleAddOrder}>
              <AddButtonText>Siparişi Ekle</AddButtonText>
            </AddButton>
          </ModalScrollContent>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
} 