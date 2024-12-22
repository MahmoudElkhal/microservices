package microservices.clientinfo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


    @Entity
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
public class Vehicle {
        @Id
        public UUID id;
        public UUID clientId; // Référence à l'ID du Client
        public String vin; // Numéro de châssis (Vehicle Identification Number)
        public String registrationNumber; // Numéro d'immatriculation
        public String brand; // Marque
        public String model; // Modèle
        public int year; // Année de fabrication
        public String color; // Couleur
        public int mileage; // Kilométrage
        public String fuelType; // Type de carburant (e.g., "Essence", "Diesel")
        public String purchaseDate; // Date d'achat (as a simple string)
        public String state; // État du véhicule (e.g., "New", "Used")


    }
