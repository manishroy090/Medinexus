import { type FastifyInstance } from "fastify";
import { request } from "https";
import { DepartmentRoutes } from "./Department.Routes";
import { DoctorRoutes } from "./Doctor.Routes";
import { AppointmentRoutes } from "./Appointment.Routes";
import { AdmissionRoutes } from "./Admission.Routes";
import { BillRoutes } from "./Bill.Routes";
import { MedicialRecord } from "./MedicialRecord.Routes";
import { PatientRoutes } from "./Patient.Routes";
import { MedicinesRoutes } from "./Medicines.Routes";



export async function HoshpitalRoutes(fastify: FastifyInstance) {
    fastify.register(DepartmentRoutes, { prefix: '/departments' });
    fastify.register(DoctorRoutes, { prefix: '/doctors' });
    fastify.register(AppointmentRoutes, { prefix: '/appointment' });
    fastify.register(AdmissionRoutes, { prefix: '/admission' });
    fastify.register(BillRoutes, { prefix: '/bill' });
    fastify.register(MedicialRecord, { prefix: '/medicalrecord' });
    fastify.register(MedicinesRoutes, { prefix: '/medicines' });
    fastify.register(PatientRoutes, { prefix: '/patient' });
}
