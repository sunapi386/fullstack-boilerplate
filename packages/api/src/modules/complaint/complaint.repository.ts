import { Service } from "typedi"
import { Complaint } from "./complaint.entity"

@Service()
export class ComplaintRepository {
  findById(complaintId: string): Promise<Complaint> {
    return Complaint.findOneOrFail(complaintId)
  }

  findAll(): Promise<Complaint[]> {
    return Complaint.find()
  }
}
