import React, { useState } from "react";
import styled from "styled-components";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Code,
  Contact
} from "lucide-react";
import { useUser } from "../../../context/useContext";
const Colors = {
  primary: "#FF85B3",
  secondary: "#FFB8D4",
  accent: "#97E5EF",
  background: "#FFF5F8",
  text: "#4A4A4A",
  white: "#FFFFFF",
  hover: "#FFE5EE",
  gradient: "linear-gradient(135deg, #FF85B3 0%, #FFB8D4 100%)",
};

const Perfil = () => {
  const { user } = useUser();
  console.log(user);
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: user?.data?.nombre,
    email: user?.data?.correo,
    phone: "+591 " + user?.data?.telefono,
    cuenta: user?.data?.estado ? "Cuenta activada" : "Cuenta desactivada",
    password: user?.data?.password,
    role: user?.data?.rol,
  });

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImageContainer>
          <ProfileImage src={profileImage} alt="Profile" />
          <ImageUploadLabel>
           
        
          </ImageUploadLabel>
        </ProfileImageContainer>
        <ProfileName>{userData.name}</ProfileName>
        <ProfileRole>{userData.role}</ProfileRole>
      </ProfileHeader>

      <ProfileSection>
        <SectionTitle>
          <h2>Información Personal</h2>
        </SectionTitle>

        <InfoGrid>
          <InfoItem>
            <User size={20} />
            <div>
              <Label>Nombre Completo</Label>
              {isEditing ? (
                <EditInput
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              ) : (
                <Value>{userData.name}</Value>
              )}
            </div>
          </InfoItem>

          <InfoItem>
            <Mail size={20} />
            <div>
              <Label>Correo Electrónico</Label>
              {isEditing ? (
                <EditInput
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              ) : (
                <Value>{userData.email}</Value>
              )}
            </div>
          </InfoItem>

          <InfoItem>
            <Phone size={20} />
            <div>
              <Label>Teléfono</Label>
              {isEditing ? (
                <EditInput
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              ) : (
                <Value>{userData.phone}</Value>
              )}
            </div>
          </InfoItem>

          <InfoItem>
            <Contact size={20} />
            <div>
              <Label>Estado de cuenta</Label>
              {isEditing ? (
                <EditInput
                  value={userData.cuenta}
                  onChange={(e) =>
                    setUserData({ ...userData, cuenta: e.target.value })
                  }
                />
              ) : (
                <Value>{userData.cuenta}</Value>
              )}
            </div>
          </InfoItem>

          <InfoItem>
            <Code size={20} />
            <div>
              <Label>Contraseña</Label>
              <Value>{userData.password}</Value>
            </div>
          </InfoItem>
        </InfoGrid>
      </ProfileSection>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  border-radius: 16px;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid ${Colors.primary};
`;

const ImageUploadLabel = styled.label`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: ${Colors.gradient};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.white};
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  input[type="file"] {
    display: none;
  }
`;

const ProfileName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${Colors.text};
  margin-bottom: 0.5rem;
`;

const ProfileRole = styled.p`
  color: ${Colors.primary};
  font-weight: 500;
`;

const ProfileSection = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${Colors.background};
  padding-bottom: 1rem;

  h2 {
    font-size: 1.2rem;
    color: ${Colors.text};
  }
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${Colors.hover};
  color: ${Colors.primary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${Colors.primary}20;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${Colors.text};

  svg {
    color: ${Colors.primary};
    flex-shrink: 0;
  }
`;

const Label = styled.p`
  font-size: 0.85rem;
  color: ${Colors.primary};
  margin-bottom: 0.25rem;
`;

const Value = styled.p`
  font-weight: 500;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${Colors.secondary};
  border-radius: 8px;
  font-size: 1rem;
  color: ${Colors.text};
`;

export default Perfil;
