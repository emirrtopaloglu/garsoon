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

interface ExtraOption {
  id: number;
  name: string;
  price: number;
}

interface ExtraOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { selectedExtras: number[]; note: string }) => void;
}

interface ExtraOptionButtonProps {
  isSelected: boolean;
}

interface ExtraOptionTextProps {
  isSelected: boolean;
}

const extraOptions: ExtraOption[] = [
  { id: 1, name: "Mısır", price: 5 },
  { id: 2, name: "Mantar", price: 5 },
  { id: 3, name: "Sucuk", price: 10 },
  { id: 4, name: "Zeytin", price: 5 },
  { id: 5, name: "Biber", price: 5 },
  { id: 6, name: "Soğan", price: 5 },
];

const ExtraOptionButton = styled.TouchableOpacity<ExtraOptionButtonProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${(props: ExtraOptionButtonProps) => props.isSelected ? "#e6fff0" : "#f8f9fa"};
  border-radius: 16px;
  margin-bottom: 12px;
  border: 1px solid ${(props: ExtraOptionButtonProps) => props.isSelected ? "#06ef7f" : "transparent"};
`;

const ExtraOptionText = styled.Text<ExtraOptionTextProps>`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: ${(props: ExtraOptionTextProps) => props.isSelected ? "bold" : "normal"};
`;

const ExtraOptionPrice = styled.Text`
  font-size: 16px;
  color: #06ef7f;
  font-weight: bold;
`;

const toggleExtra = (id: number) => {
  setSelectedExtras(prev => 
    prev.includes(id) 
      ? prev.filter(item => item !== id)
      : [...prev, id]
  );
};

const ExtraOptionsModal: React.FC<ExtraOptionsModalProps> = ({ visible, onClose, onSave }) => {
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [note, setNote] = useState("");

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Overlay>
        <Content intensity={80}>
          <Header>
            <Title>Ekstra Seçenekler</Title>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="#1a1a1a" />
            </CloseButton>
          </Header>

          <ScrollView showsVerticalScrollIndicator={false}>
            {extraOptions.map(option => (
              <ExtraOptionButton
                key={option.id}
                isSelected={selectedExtras.includes(option.id)}
                onPress={() => toggleExtra(option.id)}
              >
                <ExtraOptionText isSelected={selectedExtras.includes(option.id)}>
                  {option.name}
                </ExtraOptionText>
                <ExtraOptionPrice>+{option.price} TL</ExtraOptionPrice>
              </ExtraOptionButton>
            ))}

            <Input
              placeholder="Not ekle..."
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            <AddButton onPress={() => onSave({ selectedExtras, note })}>
              <AddButtonText>Kaydet</AddButtonText>
            </AddButton>
          </ScrollView>
        </Content>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const Content = styled(BlurView)`
  background-color: white;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 24px;
  padding-bottom: 48px;
`;

const Input = styled.TextInput`
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  margin-bottom: 16px;
`;

export default function AddOrderModal({ visible, onClose, onAddOrder }: AddOrderModalProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [showExtraOptions, setShowExtraOptions] = useState(false);
  const [extras, setExtras] = useState<{ selectedExtras: number[], note: string }>({ selectedExtras: [], note: "" });

  const filteredItems = selectedCategory === 'Tümü'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const handleQuantityChange = (itemId: number, change: number) => {
    const newQuantities = {
      ...quantities,
      [itemId]: Math.max(0, (quantities[itemId] || 0) + change)
    };
    setQuantities(newQuantities);

    // Pizza siparişi için ekstra seçenekler modalını aç
    const item = menuItems.find(m => m.id === itemId);
    if (item?.category === 'Pizza' && newQuantities[itemId] === 1) {
      setShowExtraOptions(true);
    }
  };

  const handleAddOrder = () => {
    const selectedItems = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        const item = menuItems.find(m => m.id === parseInt(itemId));
        const isPizza = item?.category === 'Pizza';
        
        // Ekstra malzemelerin toplam fiyatını hesapla
        const extrasTotalPrice = isPizza && quantity === 1 ? 
          extras.selectedExtras.reduce((total, extraId) => {
            const extraOption = extraOptions.find(opt => opt.id === extraId);
            return total + (extraOption?.price || 0);
          }, 0) : 0;

        return {
          name: item!.name,
          price: (item!.price * quantity) + extrasTotalPrice,
          quantity,
          // Sadece pizza ve adet 1 ise ekstraları ekle
          ...(isPizza && quantity === 1 ? {
            extras: extras.selectedExtras,
            note: extras.note
          } : {})
        };
      });

    if (selectedItems.length > 0) {
      selectedItems.forEach(item => onAddOrder(item));
      onClose();
      setQuantities({});
      setExtras({ selectedExtras: [], note: "" });
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

      <ExtraOptionsModal
        visible={showExtraOptions}
        onClose={() => setShowExtraOptions(false)}
        onSave={(data) => {
          setExtras(data);
          setShowExtraOptions(false);
        }}
      />
    </Modal>
  );
} 