INSERT INTO students (
    id,
    name,
    email,
    phone,
    address,
    birthdate,
    semester,
    status
) VALUES
(1001, 'Juan Perez', 'juan.perez@gmail.com', '3001234567', 'Calle 10 # 15-20', '2002-05-15', 3, TRUE),

(1002, 'Maria Gomez', 'maria.gomez@gmail.com', '3012345678', 'Carrera 20 # 10-30', '2001-08-22', 5, TRUE),

(1003, 'Carlos Rodriguez', 'carlos.rodriguez@gmail.com', '3023456789', 'Calle 25 # 12-40', '2003-01-10', 2, TRUE),

(1004, 'Laura Martinez', 'laura.martinez@gmail.com', '3034567890', 'Carrera 15 # 8-25', '2000-11-30', 7, TRUE),

(1005, 'Andres Lopez', 'andres.lopez@gmail.com', '3045678901', 'Calle 30 # 20-15', '2002-03-18', 4, TRUE),

(1006, 'Daniela Ramirez', 'daniela.ramirez@gmail.com', '3056789012', 'Carrera 12 # 5-18', '2001-06-25', 6, TRUE),

(1007, 'Santiago Torres', 'santiago.torres@gmail.com', '3107890123', 'Calle 18 # 22-10', '2003-09-12', 1, TRUE),

(1008, 'Valentina Hernandez', 'valentina.hernandez@gmail.com', '3118901234', 'Carrera 8 # 14-32', '2002-12-05', 8, TRUE),

(1009, 'Sebastian Castro', 'sebastian.castro@gmail.com', '3129012345', 'Calle 40 # 18-22', '2001-04-14', 9, TRUE),

(1010, 'Camila Moreno', 'camila.moreno@gmail.com', '3130123456', 'Carrera 25 # 30-12', '2000-07-20', 10, TRUE);

INSERT INTO courses (
    name,
    description,
    credits,
    semester,
    status
) VALUES
('Programación I', 'Fundamentos de programación, algoritmos y lógica computacional.', 3, 1, TRUE),

('Matemáticas I', 'Fundamentos de álgebra, ecuaciones, funciones y operaciones matemáticas.', 4, 1, TRUE),

('Bases de Datos', 'Modelado de datos, lenguaje SQL y sistemas gestores de bases de datos.', 3, 3, TRUE),

('Programación Web I', 'Desarrollo de aplicaciones web utilizando HTML, CSS, JavaScript y TypeScript.', 3, 4, TRUE),

('Arquitectura de Software', 'Principios, patrones y estilos arquitectónicos para el desarrollo de software.', 3, 6, TRUE),

('Ingeniería de Software', 'Procesos, metodologías ágiles y buenas prácticas para el desarrollo de software.', 3, 5, TRUE),

('Redes de Computadores', 'Fundamentos de redes, protocolos de comunicación y modelos de referencia.', 3, 4, TRUE),

('Sistemas Operativos', 'Administración de procesos, gestión de memoria y sistemas de archivos.', 3, 3, TRUE),

('Desarrollo de Aplicaciones Móviles', 'Fundamentos y desarrollo de aplicaciones para dispositivos móviles.', 3, 7, TRUE),

('Inteligencia Artificial', 'Fundamentos de inteligencia artificial, aprendizaje automático y algoritmos inteligentes.', 4, 8, TRUE);

INSERT INTO faculties (
    name,
    description,
    status
) VALUES
('Facultad de Ingeniería', 'Facultad dedicada a la formación de profesionales en ingeniería y tecnología.', TRUE),

('Facultad de Ciencias Sociales', 'Facultad enfocada en el estudio de las ciencias sociales y humanidades.', TRUE),

('Facultad de Ciencias de la Salud', 'Facultad orientada a la formación de profesionales en el área de la salud.', TRUE),

('Facultad de Ciencias Económicas y Administrativas', 'Facultad especializada en economía, administración y negocios.', TRUE),

('Facultad de Artes y Humanidades', 'Facultad que promueve la creatividad, expresión artística y estudios humanísticos.', TRUE);

INSERT INTO teachers (
    id,
    name,
    email,
    phone,
    address,
    birthdate,
    role,
    status
) VALUES
('2001', 'Juan Martinez', 'juan.martinez@gmail.com', '3311234567', 'Carrera 5 # 10-25', '1980-05-15', 'DTC', TRUE),

('2002', 'Arnulfo Velasquez ', 'arnulfo.velasquez@gmail.com', '3141234567', 'Carrera 51 # 25-25', '1987-05-15', 'DHC', TRUE),

('2003', 'Ana Caicedo', 'ana.caicedo@gmail.com', '3131234567', 'Calle 25 # 4-07', '2000-07-30', 'DMT', TRUE),

('2004', 'Andres Gómez', 'andres.gomez@gmail.com', '3111234567', 'Carrera 30 # 10-42', '1980-05-15', 'DTC', TRUE),

('2005', 'Samuel Rodriguez', 'samuel.rodriguez@gmail.com', '3121234567', 'calle 2 # 2-25', '2002-08-03', 'DHC', TRUE),

('2006', 'Teofilia Cano', 'teofilia.cano@gmail.com', '3211234567', 'Carrera 100 # 25-125', '1980-05-15', 'DTC', TRUE),

('2007', 'Fernanda Quintero', 'fernanda.quintero@gmail.com', '3231234567', 'Calle 35 # 11-25', '1998-05-15', 'DMT', TRUE);