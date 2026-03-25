import { type FastifyInstance } from "fastify";
import { request } from "https";
import { DepartmentRoutes } from "./Department.Routes.js";
import { DoctorRoutes } from "./Doctor.Routes.js";
import { AppointmentRoutes } from "./Appointment.Routes.js";
import { AdmissionRoutes } from "./Admission.Routes.js";
import { BillRoutes } from "./Bill.Routes.js";
import { MedicialRecord } from "./MedicialRecord.Routes.js";
import { PatientRoutes } from "./Patient.Routes.js";
import { MedicinesRoutes } from "./Medicines.Routes.js";



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
