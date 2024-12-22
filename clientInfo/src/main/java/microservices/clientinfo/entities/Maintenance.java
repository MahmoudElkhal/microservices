package microservices.clientinfo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.UUID;


@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
public class Maintenance {

    @Id
    public UUID id;

    public String startTime; // Temps de début as a simple string (e.g., "2024-12-22T09:00:00")
    public String endTime; // Temps de fin as a simple string
    public String description; // Description du travail
    public String status; // Statut du travail (e.g., "Planned", "InProgress", "Completed")

    public UUID vehicleId; // ID of the associated vehicle
    public UUID clientId; // ID of the associated client (if needed)
}
