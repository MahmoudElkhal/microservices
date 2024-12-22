package microservices.clientinfo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.UUID;
@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Client {
   @Id
    public UUID id;
    public String cin;
    public String firstName;
    public String lastName;
    public String address;
    public String email;
}
