-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 27, 2024 at 08:05 PM
-- Server version: 8.0.26
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medalohaapi_medalohadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin@gmail.com', 'admin', '25d55ad283aa400af464c76d713c07ad', '2021-12-09 13:51:05', '2021-12-09 13:51:05');

-- --------------------------------------------------------

--
-- Table structure for table `booking_histories`
--

CREATE TABLE `booking_histories` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `legend_id` int NOT NULL,
  `event_id` int NOT NULL,
  `booking_date` date NOT NULL,
  `session_date` varchar(255) NOT NULL,
  `rebook_session_date1` datetime DEFAULT NULL,
  `rebook_session_date2` datetime DEFAULT NULL,
  `rebook_session_date3` datetime DEFAULT NULL,
  `client_note` text,
  `private_note` text,
  `specialist_query` text,
  `booking_price` float NOT NULL,
  `payment_stripe_id` varchar(255) NOT NULL,
  `payment_intent_id` varchar(255) NOT NULL,
  `twilio_chat_id1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'for user ',
  `twilio_chat_id2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'for specialist',
  `payment_status` int NOT NULL DEFAULT '1',
  `booking_status` int NOT NULL DEFAULT '1' COMMENT '1 - booking , 2 - Done , 3 Cancel , 4 Rebook , 5 Past ,6 Specialist Rebooking request access by user , 7 : cancel booking refunded ',
  `user_rebooking_status` int DEFAULT '0' COMMENT '0- no rebooking , 1 rebooked',
  `read_status` int NOT NULL DEFAULT '0',
  `user_read_status` int NOT NULL DEFAULT '0',
  `specialist_read_status` int NOT NULL DEFAULT '0',
  `review_status` int NOT NULL DEFAULT '0',
  `card_type` varchar(255) DEFAULT NULL,
  `last4` varchar(255) DEFAULT NULL,
  `craeted_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `booking_histories`
--

INSERT INTO `booking_histories` (`id`, `user_id`, `specialist_id`, `legend_id`, `event_id`, `booking_date`, `session_date`, `rebook_session_date1`, `rebook_session_date2`, `rebook_session_date3`, `client_note`, `private_note`, `specialist_query`, `booking_price`, `payment_stripe_id`, `payment_intent_id`, `twilio_chat_id1`, `twilio_chat_id2`, `payment_status`, `booking_status`, `user_rebooking_status`, `read_status`, `user_read_status`, `specialist_read_status`, `review_status`, `card_type`, `last4`, `craeted_at`, `updated_at`) VALUES
(199, 182, 78, 4, 0, '2024-01-28', '2024-1-29 07:00:00', NULL, NULL, NULL, 'jdjdjbdhbdbhbdbdbbddhhdbhbhdbhdj', 'jaydev222', 'null', 52, 'pm_1Oc3jmHt4pOTq9avaO7XfYzg', '', 'user1_pm_1Oc3jmHt4pOTq9avaO7XfYzg', 'user2_pm_1Oc3jmHt4pOTq9avaO7XfYzg', 1, 5, 0, 0, 1, 1, 0, 'visa', '4242', '2024-01-24 16:01:18', NULL),
(200, 182, 78, 4, 0, '2024-01-25', '2024-01-25 02:30:00', NULL, NULL, NULL, NULL, 'bjcbhbhbhcbhbcchjbhjcbhjcbjhbcb', 'null', 52, 'pm_1OcOSbHt4pOTq9avafARIPbg', '', 'user1_pm_1OcOSbHt4pOTq9avafARIPbg', 'user2_pm_1OcOSbHt4pOTq9avafARIPbg', 1, 1, 0, 0, 1, 1, 0, 'visa', '4242', '2024-01-25 14:08:57', NULL),
(201, 182, 78, 4, 0, '2024-01-25', '2024-01-25 02:30:00', NULL, NULL, NULL, NULL, 'bhjdbhbdhbdhbdbhbdhbhdhjdbhjdbdbjdbhbdjhdbbjdbjb', 'null', 52, 'pm_1OcPIoHt4pOTq9avOrqpwd9n', '', 'user1_pm_1OcPIoHt4pOTq9avOrqpwd9n', 'user2_pm_1OcPIoHt4pOTq9avOrqpwd9n', 1, 1, 0, 0, 1, 1, 0, 'visa', '4242', '2024-01-25 15:02:55', NULL),
(202, 182, 78, 4, 0, '2024-01-25', '2024-01-26 01:30:00', NULL, NULL, NULL, NULL, NULL, 'null', 52, 'pm_1OcPJzHt4pOTq9avgfGW14Nn', '', 'user1_pm_1OcPJzHt4pOTq9avgfGW14Nn', 'user2_pm_1OcPJzHt4pOTq9avgfGW14Nn', 1, 1, 0, 0, 1, 1, 0, 'visa', '4242', '2024-01-25 15:04:08', NULL),
(203, 182, 78, 4, 0, '2024-01-25', '2024-01-27 10:00:00', NULL, NULL, NULL, NULL, NULL, 'null', 52, 'pm_1OcS9MHt4pOTq9avxQHntCeL', '', 'user1_pm_1OcS9MHt4pOTq9avxQHntCeL', 'user2_pm_1OcS9MHt4pOTq9avxQHntCeL', 1, 3, 0, 0, 1, 1, 0, 'visa', '4242', '2024-01-25 18:05:20', NULL),
(205, 185, 81, 1, 0, '2024-02-19', '', NULL, NULL, NULL, NULL, 'hello i am her', 'test', 28, 'pm_1OlVlbHt4pOTq9avQgL0JPh4', '', 'user1_pm_1OlVlbHt4pOTq9avQgL0JPh4', 'user2_pm_1OlVlbHt4pOTq9avQgL0JPh4', 1, 1, 0, 0, 1, 1, 1, 'visa', '4242', '2024-02-19 17:46:16', NULL),
(206, 185, 81, 1, 0, '2024-02-19', '', NULL, NULL, NULL, NULL, 'jai ', 'test 12345', 28, 'pm_1OlWRJHt4pOTq9av4Ua3ykz1', '', 'user1_pm_1OlWRJHt4pOTq9av4Ua3ykz1', 'user2_pm_1OlWRJHt4pOTq9av4Ua3ykz1', 1, 1, 0, 0, 1, 1, 0, 'visa', '4242', '2024-02-19 18:29:22', NULL),
(207, 185, 81, 8, 0, '2024-02-20', '2024-02-22 12:00:00', NULL, NULL, NULL, NULL, NULL, 'test 12345', 26, 'pm_1OlmFZHt4pOTq9avqenhtnTN', '', 'user1_pm_1OlmFZHt4pOTq9avqenhtnTN', 'user2_pm_1OlmFZHt4pOTq9avqenhtnTN', 1, 5, 0, 0, 1, 1, 0, 'visa', '4242', '2024-02-20 11:22:18', NULL),
(208, 185, 78, 4, 0, '2024-02-20', '2024-02-24 09:00:00', NULL, NULL, NULL, NULL, NULL, 'test 12345', 52, 'pm_1OlmLFHt4pOTq9avVIkgQ6zb', '', 'user1_pm_1OlmLFHt4pOTq9avVIkgQ6zb', 'user2_pm_1OlmLFHt4pOTq9avVIkgQ6zb', 1, 3, 0, 0, 1, 1, 0, 'visa', '4242', '2024-02-20 11:28:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `language_id` int NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_image` varchar(255) NOT NULL,
  `status` int DEFAULT '0',
  `category_desc` text NOT NULL,
  `created_by_id` int NOT NULL DEFAULT '0' COMMENT '0-by admin,1-by suggestion',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `language_id`, `category_name`, `category_image`, `status`, `category_desc`, `created_by_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'All Specialist', '1.png', 1, 'Lorem Ipsum', 0, NULL, '2022-03-14 12:17:34'),
(2, 1, 'Antroposophy', '11.png', 1, 'Anthroposophy is a philosophy founded in the early 20th century by the esotericist Rudolf Steiner that postulates the existence of an objective, intellectually comprehensible spiritual world, accessible to human experience. ', 0, NULL, '2022-01-20 14:22:29'),
(3, 1, 'Ayurveda', '2.png', 1, ' Ayurvedic medicine is one of the worlds oldest holistic healing systems. It was developed more than 3000 years ago in India. Its based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit. Its main goal is to promote good health, not fight disease.', 0, NULL, '2022-01-20 13:33:52'),
(4, 1, 'Coaching', '12.png', 1, 'Coaching is a form of development in which an experienced person, called a coach, supports a learner or client in achieving a specific personal or professional goal by providing training and guidance', 0, '2021-12-14 18:11:40', '2022-05-31 12:10:37'),
(5, 1, 'Couple & Sexuality', '18.png', 1, 'Marriage counseling originated in Germany in the 1920s as part of the eugenics movement.The first institutes for marriage counseling in the United States began in the 1930s, partly in response to Germanys medically directed, racial purification marriage counseling centers', 0, '2022-01-20 13:27:12', '2022-03-14 12:19:17'),
(6, 1, 'Dentosophy', '4.png', 1, 'Dentition pertains to the development of teeth and their arrangement in the mouth. In particular, it is the characteristic arrangement, kind, and number of teeth in a given species at a given age.', 0, '2022-01-20 13:53:08', '2022-01-20 13:55:51'),
(7, 1, 'Femenine Care & Pregnancy', '22.png', 1, 'From personal style to individuality to an active lifestyle, our Kotex and Intimus brands aim to inspire confidence in every aspect of femininity. Kimberly-Clarks feminine care brands are trusted by millions of women in more than 100 countries to do just that.', 0, '2022-01-20 14:00:25', '2022-03-14 12:20:18'),
(8, 1, 'Flower Therapy', '5.png', 1, 'Bach flower remedies are solutions of brandy and water the water containing extreme dilutions of flower material developed by Edward Bach, an English homeopath, in the 1930s.', 0, '2022-01-20 14:03:44', '2022-03-14 12:23:04'),
(9, 1, 'German New Medicine & Biodecoding', '8.png', 1, 'Ryke Geerd Hamer  was a German ex-physician and the originator of Germanic New Medicine , also formerly known as German New Medicine and New Medicine, a system of pseudo-medicine that purports to be able to cure cancer', 0, '2022-01-20 14:10:05', '2022-01-20 14:23:36'),
(10, 1, 'Homeopathy', '13.png', 1, 'Homeopathy or homoeopathy is a pseudoscientific system of alternative medicine. It was conceived in 1796 by the German physician Samuel Hahnemann. Its practitioners, called homeopaths, believe that a substance that causes symptoms of a disease in healthy people can cure similar symptoms in sick people, this doctrine is called similia similibus curentur, orlike cures like', 0, '2022-01-20 14:11:33', '2022-01-20 14:12:16'),
(11, 1, 'Integrative Medicine', '24.png', 1, 'A type of medical care that combines conventional (standard) medical treatment with complementary and alternative (CAM) therapies that have been shown to be safe and to work. CAM therapies treat the mind, body, and spirit.', 0, '2022-01-20 14:25:04', '2022-01-20 14:26:51'),
(12, 1, 'Natural Vet Care', 'Senza-titolo-1.jpg', 1, 'Veterinary medicine is the branch of medicine that deals with the prevention, control, diagnosis, and treatment of disease, disorder, and injury in animals. Along with this, it deals with animal rearing, husbandry, breeding, research on nutrition, and product development. ', 0, '2022-01-20 14:29:09', '2023-04-19 00:32:14'),
(13, 1, 'Naturopathy', '6.png', 1, 'The practices of naturopaths, the practitioners of naturopathic medicine, vary widely and are difficult to generalize. Treatments range from outright quackery, like homeopathy, to widely accepted practices like psychotherapy.[', 0, '2022-01-20 14:31:12', '2022-03-14 12:26:46'),
(14, 1, 'Nutrition', '14.png', 1, 'Human nutrition deals with the provision of essential nutrients from food that are necessary to support human life and good health.In humans, poor nutrition can cause deficiency-related diseases such as blindness, anemia, scurvy, preterm birth, stillbirth and cretinism,', 0, '2022-01-20 14:34:47', '2022-01-20 14:34:55'),
(15, 1, 'Puericulture', '7.png', 1, 'In 1865 the definition of childcare was born, understood as the science that deals with hygiene and child rearing . Scientifically it is a branch of pediatrics that studies problems relating to the growth and physical and mental development of the child, from birth to the end of early childhood', 0, '2022-01-22 12:51:56', '2022-03-14 12:27:57'),
(16, 1, 'Preventive Medicine', '16.png', 1, 'Preventive healthcare, or prophylaxis, consists of measures taken for disease prevention. Disease and disability are affected by environmental factors, genetic predisposition, disease agents, and lifestyle choices, and are dynamic processes which begin before individuals realize they are affected', 0, '2022-01-22 12:54:40', '2022-03-14 12:28:43'),
(17, 1, 'Psychotherapy', 'Risorsa 3-100.jpg', 1, 'Psychotherapy (also psychological therapy or talking therapy) is the use of psychological methods, particularly when based on regular personal interaction, to help a person change behavior, increase happiness, and overcome problems. Psychotherapy aims to improve an individuals well-being and mental health, to resolve or mitigate troublesome behaviors, beliefs, compulsions, thoughts, or emotions, and to improve relationships and social skills. ', 0, '2022-01-22 12:58:51', '2023-04-19 00:33:10'),
(18, 1, 'Somatic Resolution & Hypnotherapy', '19.png', 1, 'Human somatic variations are mutations that occur in somatic cells both at early stages of development and in adult cells. These variations can lead either to pathogenic phenotypes or not, even if their function in healthy conditions is not completely clear yet.', 0, '2022-01-22 13:00:52', '2022-03-14 12:32:40'),
(19, 1, 'Soul Wellness', '10.png', 1, 'It Is Well With My Soul is a hymn penned by hymnist Horatio Spafford and composed by Philip Bliss. First published in Gospel Hymns No. 2 by Ira Sankey', 0, '2022-01-22 13:03:04', '2022-03-14 12:33:00'),
(20, 1, 'Traditional Chinese Medicine', '20.png', 1, 'Traditional Chinese medicine (TCM) is a branch of traditional medicine in China. It has been described as fraught with pseudoscience, and the majority of its treatments as having no logical mechanism of action.', 0, '2022-01-22 13:05:25', '2022-03-14 12:34:00'),
(27, 13, 'Transgenerational & Constellations', '', 0, 'Family Constellations, also known as Systemic Constellations and Systemic Family Constellations, is a therapeutic method which draws on elements of family systems therapy, existential phenomenology and isiZulu beliefs and attitudes to family', 0, '2022-02-10 12:39:40', NULL),
(28, 2, 'Tutti Specialisti', '1.png', 1, 'Lorem Ipsum', 0, '2022-02-10 19:36:46', '2022-05-31 12:16:04'),
(29, 2, 'Antroposofia', '11 (1).png', 1, 'Lorem Ipsum', 0, '2022-02-10 19:51:22', '2022-05-31 12:40:46'),
(30, 2, 'Ayurveda', '2.png', 1, 'Lorem Ipsum', 0, NULL, '2022-05-31 12:41:23'),
(31, 2, 'Istruire', '12.png', 1, 'Lorem Ipsum', 0, NULL, '2022-05-31 12:43:09'),
(32, 2, 'Coppia & Sessualità', '18.png', 1, 'Lorem Ipsum', 0, NULL, '2022-05-31 12:45:54'),
(33, 2, 'Dentosofia', '4.png', 1, 'Lorem Ipsum', 0, '2022-02-24 10:54:07', '2022-05-31 12:46:18'),
(34, 2, 'Cura femminile e gravidanza', '1.png', 1, 'Lorem Ipsum', 0, '2022-02-24 10:55:43', '2022-05-31 12:32:57'),
(35, 2, 'Floriterapia', '5.png', 1, 'Lorem Ipsum', 0, '2022-03-21 12:53:02', '2022-05-31 12:48:23'),
(36, 2, 'Nuova medicina tedesca e biodecodifica', '8.png', 1, 'Lorem Ipsum', 0, '2022-03-21 15:21:11', '2022-05-31 12:49:18'),
(37, 2, 'Omeopatia', '13.png', 1, 'Lorem Ipsum', 0, '2022-05-31 12:26:17', '2022-05-31 12:50:25'),
(38, 2, 'Medicina Integrativa', '24.png', 1, 'Lorem Ipsum', 0, '2022-05-31 12:27:06', '2022-05-31 12:59:54'),
(39, 2, 'Cure veterinarie naturali', '1.png', 1, 'Lorem Ipsum', 0, '2022-05-31 12:28:36', '2022-05-31 12:35:19'),
(40, 2, 'Naturopatia', '6.png', 1, 'Lorem Ipsum', 0, '2022-05-31 12:36:05', '2022-05-31 12:52:35'),
(41, 2, 'Nutrizione', '14.png', 1, 'Lorem Ipsum', 0, '2022-05-31 15:10:11', '2022-05-31 15:14:13'),
(42, 2, 'Puericultura', '7.png', 1, 'Lorem Ipsum', 0, '2022-05-31 15:11:54', '2022-05-31 15:14:08'),
(43, 2, 'Medicina preventiva', '16.png', 1, 'Lorem Ipsum', 0, '2022-05-31 15:13:58', '2022-05-31 15:14:04'),
(44, 2, 'Psicoterapia', '17.png', 1, 'Lorem Ipsum', 0, '2022-05-31 15:59:15', '2022-05-31 15:59:54'),
(45, 2, 'Risoluzione somatica e ipnoterapia', '19.png', 1, 'Lorem Ipsum', 0, '2022-05-31 16:01:40', '2022-06-04 13:14:10'),
(46, 2, 'Benessere dell\'anima', '10.png', 1, 'Lorem Ipsum', 0, '2022-05-31 16:02:48', '2022-06-04 13:14:05'),
(47, 3, 'Toda especialista', '1 (1).png', 1, 'lorem ipsum', 0, '2022-06-04 15:40:04', '2022-06-04 16:23:26'),
(48, 3, 'antroposofía', '11 (1).png', 1, 'lorem ipsum', 0, '2022-06-04 15:42:57', '2022-06-04 16:24:27'),
(49, 3, 'Ayurveda', '2 (1).png', 1, 'lorem ipsum', 0, '2022-06-04 15:44:02', '2022-06-04 16:25:13'),
(50, 3, 'Entrenamiento', '12 (1).png', 1, 'lorem ipsum', 0, '2022-06-04 15:44:54', '2022-06-04 16:30:10'),
(51, 3, 'Pareja & Sexualidad', '18 (1).png', 1, 'lorem ipsum', 0, '2022-06-04 15:47:12', '2022-06-04 16:31:42'),
(52, 3, 'Dentosofía', '4 (1).png', 1, 'lorem ipsum', 0, '2022-06-04 15:47:55', '2022-06-04 16:32:31'),
(53, 3, 'Cuidado Femenino y Embarazo', '1 (1).png', 1, 'lorem ipsum', 0, '2022-06-04 15:49:34', '2022-06-04 16:37:14'),
(54, 3, 'Terapia floral', '5.png', 1, 'lorem ipsum', 0, '2022-06-04 15:50:19', '2022-06-04 17:29:37'),
(55, 3, 'Nueva medicina alemana y biodescodificación', '8.png', 1, 'lorem ipsum', 0, '2022-06-04 15:51:32', '2022-06-04 17:33:36'),
(56, 3, 'Homeopatía', '13.png', 1, 'lorem ipsum', 0, '2022-06-04 15:52:37', '2022-06-04 17:34:40'),
(57, 3, 'Medicina Integrativa', '23.png', 1, 'lorem ipsum', 0, '2022-06-04 15:53:21', '2022-06-04 17:37:01'),
(58, 3, 'Cuidado veterinario natural', '24.png', 1, 'lorem ipsum', 0, '2022-06-04 15:54:05', '2022-06-04 17:37:54'),
(59, 3, 'Naturopatía', '6.png', 1, 'lorem ipsum', 0, '2022-06-04 16:09:10', '2022-06-04 17:39:36'),
(60, 3, 'Nutrición', '14.png', 1, 'lorem ipsum', 0, '2022-06-04 16:09:40', '2022-06-04 18:03:32'),
(61, 3, 'Puericulture', '7.png', 1, 'lorem ipsum', 0, '2022-06-04 16:10:05', '2022-06-04 18:04:59'),
(62, 3, 'Medicina Preventiva', '16.png', 1, 'lorem ipsum', 0, '2022-06-04 16:11:16', '2022-06-04 18:06:55'),
(63, 3, 'Psicoterapia', 'Risorsa 1.png', 1, 'lorem ipsum', 0, '2022-06-04 16:11:57', '2023-04-18 23:33:48'),
(64, 1, 'Resolución Somática e Hipnoterapia', 'png-transparent-heart-sketch-heart-love-text-description.png', 1, 'lorem ipsum', 0, '2022-06-04 16:13:36', '2023-04-18 23:22:40'),
(65, 3, 'Bienestar del alma', '10.png', 1, 'lorem ipsum', 0, '2022-06-04 16:14:15', '2022-06-06 11:09:12'),
(66, 3, 'medicina tradicional china', '20.png', 1, 'lorem ipsum', 0, '2022-06-04 16:14:50', '2023-04-07 12:57:05'),
(67, 14, 'demo', 'Screenshot from 2023-04-07 11-14-59.png', 1, 'demo', 0, '2023-04-07 13:01:18', '2023-04-07 13:02:48'),
(68, 1, 'Categoryname', 'WhatsApp Image 2023-12-30 at 11.02.56 PM.jpeg', 1, 'Description', 0, '2023-12-30 23:22:15', '2023-12-30 23:22:49'),
(69, 1, 'Suggestion', '', 0, '', 0, NULL, NULL),
(70, 1, 'teslahjdu', '', 0, '', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int NOT NULL,
  `country_id` int NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '1' COMMENT '1- live , 0 disabled ',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `country_id`, `city_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Delhi12', 0, '2021-08-09 00:00:00', '2021-12-14 18:46:25'),
(2, 1, 'Agra', 1, '2021-08-09 00:00:00', '2021-08-09 00:00:00'),
(3, 2, 'Test1', 1, '2021-08-09 00:00:00', '2021-08-09 00:00:00'),
(4, 6, 'TEst 2', 1, '2021-08-09 00:00:00', '2021-08-09 00:00:00'),
(5, 7, 'Test 7', 1, '2021-11-09 00:00:00', '2021-11-09 00:00:00'),
(6, 8, 'Test 8', 1, '2021-11-09 00:00:00', '2021-11-10 00:00:00'),
(7, 1, 'ddd', 0, '0000-00-00 00:00:00', '2022-03-21 15:15:42'),
(8, 1, 'Gwalior', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int NOT NULL,
  `country_name` varchar(255) NOT NULL,
  `country_code` varchar(255) NOT NULL,
  `country_code_number` text NOT NULL,
  `status` int NOT NULL DEFAULT '1' COMMENT '1- live country , 0 disabled country ',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `country_name`, `country_code`, `country_code_number`, `status`, `created_at`, `updated_at`) VALUES
(1, 'India', 'IN', '+91', 1, '2021-08-24 00:00:00', '2024-02-23 10:47:11'),
(2, 'Switzerland', 'CH', '+41', 1, '2021-11-09 00:00:00', '2024-02-23 07:54:16'),
(6, 'Argentina', 'AR', '', 1, '2021-11-09 00:00:00', '2021-11-09 00:00:00'),
(7, 'Bolivia', 'BO', '', 1, '2021-11-09 00:00:00', '2021-11-09 00:00:00'),
(8, 'Colombia', 'CO', '', 1, '2021-11-09 00:00:00', '2021-11-02 00:00:00'),
(10, 'Russia', '', '', 1, '2022-03-14 13:52:55', '0000-00-00 00:00:00'),
(11, 'Germany', '', '', 1, '2022-03-14 13:53:24', '0000-00-00 00:00:00'),
(12, 'United Kingdom', '', '', 1, '2022-03-14 13:53:43', '0000-00-00 00:00:00'),
(13, 'France', '', '+33', 1, '2022-03-14 13:54:00', '2024-02-23 12:29:27'),
(14, 'Italy', '', '0', 1, '2022-03-14 13:54:12', '0000-00-00 00:00:00'),
(15, 'Spain', '', '0', 1, '2022-03-14 13:54:25', '0000-00-00 00:00:00'),
(16, 'Ukraine', '', '0', 1, '2022-03-14 13:54:40', '0000-00-00 00:00:00'),
(17, 'Poland', '', '0', 1, '2022-03-14 13:54:56', '0000-00-00 00:00:00'),
(18, 'Romania', '', '+40', 1, '2022-03-14 13:55:14', '2022-03-14 14:55:49'),
(19, 'Netherlands', '', '+31', 1, '2022-03-14 13:55:34', '2022-03-14 14:52:25'),
(20, 'Belgium', '', '+32', 1, '2022-03-14 13:55:51', '2022-03-14 14:52:48'),
(21, 'Czech Republic (Czechia)', '', '0', 0, '2022-03-14 13:56:05', '2024-02-23 10:47:12'),
(22, 'Greece', '', '+30', 0, '2022-03-14 13:56:16', '2024-02-26 22:45:27'),
(23, 'Portugal', '', '0', 1, '2022-03-14 13:56:29', '0000-00-00 00:00:00'),
(24, 'Sweden', '', '0', 1, '2022-03-14 13:56:44', '0000-00-00 00:00:00'),
(25, 'Hungary', '', '+36', 1, '2022-03-14 13:56:57', '2022-03-14 14:55:17'),
(26, 'Belarus', '', '0', 1, '2022-03-14 13:57:10', '0000-00-00 00:00:00'),
(27, 'Austria', '', '0', 0, '2022-03-14 13:57:21', '2024-02-23 08:28:53'),
(28, 'Serbia', '', '0', 1, '2022-03-14 13:57:33', '0000-00-00 00:00:00'),
(29, 'Bulgaria', '', '0', 0, '2022-03-14 13:58:04', '2024-02-26 03:33:27'),
(30, 'Denmark', '', '0', 1, '2022-03-14 13:58:18', '0000-00-00 00:00:00'),
(31, 'Finland', '', '0', 1, '2022-03-14 13:58:33', '0000-00-00 00:00:00'),
(32, 'Slovakia', '', '0', 1, '2022-03-14 13:58:45', '0000-00-00 00:00:00'),
(33, 'Norway', '', '0', 1, '2022-03-14 13:58:56', '2024-02-24 00:41:13'),
(34, 'Ireland', '', '0', 1, '2022-03-14 13:59:10', '0000-00-00 00:00:00'),
(35, 'Croatia', '', '0', 1, '2022-03-14 13:59:23', '0000-00-00 00:00:00'),
(36, 'Moldova', '', '0', 1, '2022-03-14 13:59:33', '0000-00-00 00:00:00'),
(37, 'Bosnia and Herzegovina', '', '0', 1, '2022-03-14 13:59:44', '0000-00-00 00:00:00'),
(38, 'Albania', '', '0', 1, '2022-03-14 13:59:58', '0000-00-00 00:00:00'),
(39, 'Lithuania', '', '0', 1, '2022-03-14 14:00:08', '0000-00-00 00:00:00'),
(40, 'North Macedonia', '', '0', 1, '2022-03-14 14:00:23', '0000-00-00 00:00:00'),
(41, 'Slovenia', '', '0', 1, '2022-03-14 14:00:48', '0000-00-00 00:00:00'),
(42, 'Latvia', '', '0', 1, '2022-03-14 14:01:04', '0000-00-00 00:00:00'),
(43, 'Estonia', '', '0', 0, '2022-03-14 14:01:18', '2024-02-24 23:04:39'),
(44, 'Montenegro', '', '0', 1, '2022-03-14 14:01:27', '0000-00-00 00:00:00'),
(45, 'Luxembourg', '', '0', 1, '2022-03-14 14:01:38', '0000-00-00 00:00:00'),
(46, 'Malta', '', '0', 1, '2022-03-14 14:01:52', '0000-00-00 00:00:00'),
(47, 'Iceland', '', '0', 1, '2022-03-14 14:02:03', '0000-00-00 00:00:00'),
(48, 'Andorra', '', '0', 1, '2022-03-14 14:02:14', '0000-00-00 00:00:00'),
(49, 'Monaco', '', '0', 0, '2022-03-14 14:02:23', '2024-02-23 03:51:59'),
(50, 'Liechtenstein', '', '0', 1, '2022-03-14 14:02:35', '0000-00-00 00:00:00'),
(51, 'San Marino', '', '0', 1, '2022-03-14 14:02:45', '0000-00-00 00:00:00'),
(52, 'Holy See', '', '0', 1, '2022-03-14 14:03:02', '2024-02-23 22:53:07'),
(54, 'nepal', '', '', 0, '2023-04-07 13:10:22', '2023-04-07 13:11:57');

-- --------------------------------------------------------

--
-- Table structure for table `email_next_slot`
--

CREATE TABLE `email_next_slot` (
  `id` int NOT NULL,
  `spec_id` int NOT NULL,
  `user_id` int NOT NULL,
  `email_alert_status` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `email_next_slot`
--

INSERT INTO `email_next_slot` (`id`, `spec_id`, `user_id`, `email_alert_status`, `created_at`) VALUES
(1, 68, 0, 0, '2023-12-06 10:32:14'),
(3, 78, 182, 1, '2024-01-29 12:20:08'),
(4, 78, 182, 1, '2024-01-29 12:22:02'),
(5, 78, 182, 1, '2024-01-29 13:30:04'),
(6, 78, 182, 1, '2024-02-01 07:32:11'),
(7, 78, 182, 1, '2024-02-01 07:32:55'),
(8, 78, 182, 1, '2024-02-01 07:35:31'),
(9, 78, 182, 1, '2024-02-01 07:37:31'),
(10, 78, 182, 1, '2024-02-01 07:50:30'),
(11, 78, 182, 1, '2024-02-01 08:09:39'),
(12, 78, 182, 1, '2024-02-01 09:08:05'),
(13, 78, 182, 1, '2024-02-01 09:12:46'),
(14, 78, 182, 1, '2024-02-01 09:13:24'),
(15, 78, 182, 1, '2024-02-01 10:10:32'),
(16, 78, 182, 1, '2024-02-01 10:11:12'),
(17, 78, 182, 1, '2024-02-01 10:27:33'),
(18, 24, 21, 0, '2024-02-01 12:51:11'),
(19, 0, 0, 0, '2024-02-01 12:53:41'),
(20, 0, 0, 0, '2024-02-01 12:54:29'),
(21, 0, 0, 0, '2024-02-01 12:55:39'),
(22, 0, 0, 0, '2024-02-01 12:58:12'),
(23, 0, 0, 0, '2024-02-01 12:59:43'),
(24, 0, 0, 0, '2024-02-01 13:02:43'),
(25, 0, 0, 0, '2024-02-01 13:04:03'),
(26, 78, 182, 1, '2024-02-01 13:06:10'),
(27, 78, 182, 1, '2024-02-01 13:08:57'),
(28, 0, 0, 0, '2024-02-06 11:44:13'),
(29, 78, 185, 1, '2024-02-19 08:03:00'),
(30, 78, 185, 1, '2024-02-19 08:34:34'),
(31, 78, 185, 1, '2024-02-19 08:43:22'),
(32, 81, 185, 1, '2024-02-19 09:11:50'),
(33, 81, 185, 1, '2024-02-19 09:20:22'),
(34, 81, 185, 1, '2024-02-19 11:45:02'),
(35, 78, 185, 1, '2024-02-19 13:04:33'),
(36, 81, 185, 1, '2024-02-19 13:10:22'),
(37, 81, 185, 1, '2024-02-20 13:53:33'),
(38, 81, 185, 1, '2024-02-20 14:35:12');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `legend_id` int NOT NULL,
  `event_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `specialist_id` int NOT NULL,
  `booking_status` int NOT NULL DEFAULT '1' COMMENT '1-Not  Booked free for other users , 2 Booked'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `legend_id`, `event_date`, `specialist_id`, `booking_status`) VALUES
(501, '8_Audio Short', 8, '2024-02-22 21:30:00', 81, 1),
(493, '4_Video', 4, '2024-02-24 05:30:00', 81, 1),
(498, '4_Video', 4, '2024-02-23 20:00:00', 81, 1),
(490, '4_Video', 4, '2024-02-24 06:00:00', 81, 1),
(500, '4_Video', 4, '2024-02-20 05:58:09', 78, 2),
(484, '8_Audio Short', 8, '2024-02-17 12:14:04', 81, 2),
(485, '8_Audio Short', 8, '2024-02-20 05:52:18', 81, 2),
(499, '11_In-vivo PART', 11, '2024-02-22 17:30:00', 81, 1),
(470, '4_Video', 4, '2024-01-24 10:31:18', 78, 2),
(471, '4_Video', 4, '2024-01-25 09:32:55', 78, 2),
(472, '4_Video', 4, '2024-01-25 08:38:57', 78, 2),
(473, '4_Video', 4, '2024-01-25 09:34:08', 78, 2),
(474, '4_Video', 4, '2024-01-26 04:00:00', 78, 1),
(475, '4_Video', 4, '2024-01-25 12:35:20', 78, 2);

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int NOT NULL,
  `language_name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `language_code` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `language_logo` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `language_name`, `language_code`, `language_logo`, `status`, `created_at`, `updated_at`) VALUES
(1, 'English', 'eng', '', 0, NULL, '2023-12-30 17:50:42'),
(2, 'Italian', 'itanian', '', 0, NULL, '2024-01-08 05:16:04'),
(3, 'Spanish', 'spanis', '', 1, NULL, '2023-12-30 09:16:02'),
(14, 'hindi', 'hindi', '', 1, '2023-04-07 12:51:41', '2023-12-30 05:34:00'),
(15, 'TestingNAme', 'testingcode', '', 1, '2023-12-30 23:13:46', '2024-01-11 10:43:38');

-- --------------------------------------------------------

--
-- Table structure for table `legends`
--

CREATE TABLE `legends` (
  `id` int NOT NULL,
  `legend_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updaed_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `legends`
--

INSERT INTO `legends` (`id`, `legend_name`, `created_at`, `updaed_at`) VALUES
(1, 'Chat', '2021-08-27 00:00:00', '2021-08-27 00:00:00'),
(2, 'Chat PART', '2021-08-27 00:00:00', '2021-08-27 00:00:00'),
(3, 'Chat FULL	', '2021-08-27 00:00:00', '2021-08-27 00:00:00'),
(4, 'Video', '2021-08-27 00:00:00', '2021-08-28 00:00:00'),
(5, 'Video PART', '2021-08-20 00:00:00', '2021-08-20 00:00:00'),
(6, 'Video FULL', '2021-08-27 00:00:00', '2021-08-27 00:00:00'),
(7, 'Audio', '2021-08-27 00:00:00', '2021-08-27 00:00:00'),
(8, 'Audio Short', '2021-08-27 00:00:00', '2021-08-27 00:00:00'),
(9, 'Full audio', '2021-08-27 00:00:00', '2021-08-27 00:00:00'),
(10, 'In-vivo', '2021-08-27 00:00:00', '2021-08-27 00:00:00'),
(11, 'In-vivo PART', '2021-08-27 00:00:00', '2021-08-27 00:00:00'),
(12, 'In-vivo FULL', '2021-08-27 00:00:00', '2021-08-27 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `legends_commissions`
--

CREATE TABLE `legends_commissions` (
  `id` int NOT NULL,
  `legends_type` int NOT NULL COMMENT '1-message , 2- video , 3- in person',
  `commission_percentage` int NOT NULL DEFAULT '0',
  `status` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `legends_commissions`
--

INSERT INTO `legends_commissions` (`id`, `legends_type`, `commission_percentage`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 10, 1, '2021-11-11 00:00:00', '2021-11-10 00:00:00'),
(2, 2, 29, 1, '2021-11-11 00:00:00', '2021-11-11 00:00:00'),
(3, 3, 40, 1, '2021-11-11 00:00:00', '2021-11-11 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `master_password`
--

CREATE TABLE `master_password` (
  `id` int NOT NULL,
  `password` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `master_password`
--

INSERT INTO `master_password` (`id`, `password`, `created_at`) VALUES
(6, 'deepakgoud12345678', '2021-12-09 13:51:05');

-- --------------------------------------------------------

--
-- Table structure for table `medaloha_reports`
--

CREATE TABLE `medaloha_reports` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `medaloha_reports`
--

INSERT INTO `medaloha_reports` (`id`, `user_id`, `specialist_id`, `message`, `created_at`, `updated_at`) VALUES
(4, 185, 81, 'this is very bad experienece from my isde', '2024-02-27 13:56:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `multiple_country_with_languages`
--

CREATE TABLE `multiple_country_with_languages` (
  `id` int NOT NULL,
  `country_id` int NOT NULL,
  `language_id` int NOT NULL,
  `status` int NOT NULL DEFAULT '1' COMMENT '1- live , 2 not live',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `multiple_country_with_languages`
--

INSERT INTO `multiple_country_with_languages` (`id`, `country_id`, `language_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2021-11-09 00:00:00', '2021-11-09 00:00:00'),
(2, 2, 2, 1, '2021-11-10 00:00:00', '2021-11-09 00:00:00'),
(5, 6, 3, 1, '2021-11-09 00:00:00', '2021-11-10 00:00:00'),
(6, 7, 3, 1, '2021-11-09 00:00:00', '2021-11-09 00:00:00'),
(7, 8, 3, 1, '2021-11-09 00:00:00', '2021-11-09 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `refund`
--

CREATE TABLE `refund` (
  `id` int NOT NULL,
  `refund_id` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `status` text NOT NULL,
  `charge` varchar(255) NOT NULL,
  `balance_transaction` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `createdata` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `refund`
--

INSERT INTO `refund` (`id`, `refund_id`, `amount`, `status`, `charge`, `balance_transaction`, `currency`, `reason`, `createdata`) VALUES
(1, 're_3JxX9RHt4pOTq9av1LD65VUz', 20, '', 'ch_3JxX9RHt4pOTq9av1P5iom2m', 'txn_3JxX9RHt4pOTq9av1tyLQdYX', 'usd', '', ''),
(2, 're_3JxX9RHt4pOTq9av1WiUlUVy', 20, 'succeeded', 'ch_3JxX9RHt4pOTq9av1P5iom2m', 'txn_3JxX9RHt4pOTq9av1LQHwdTy', 'usd', '', '1637402716'),
(3, 're_3JxX9RHt4pOTq9av13RwHQTA', 20, 'succeeded', 'ch_3JxX9RHt4pOTq9av1P5iom2m', 'txn_3JxX9RHt4pOTq9av12w0eIAF', 'usd', '', '1637402736'),
(4, 're_3JxX9RHt4pOTq9av1a4qO57I', 20, 'succeeded', 'ch_3JxX9RHt4pOTq9av1P5iom2m', 'txn_3JxX9RHt4pOTq9av1lBA6PDj', 'usd', '', '1637402859'),
(5, 're_3JxX9RHt4pOTq9av1xWK3aWB', 20, 'succeeded', 'ch_3JxX9RHt4pOTq9av1P5iom2m', 'txn_3JxX9RHt4pOTq9av1UfdUQfM', 'usd', '', '1637402983'),
(6, 're_3JxX9RHt4pOTq9av1e9TRwsl', 20, 'succeeded', 'ch_3JxX9RHt4pOTq9av1P5iom2m', 'txn_3JxX9RHt4pOTq9av1hpu4kZU', 'usd', '', '1637403106'),
(7, 're_3JxX9RHt4pOTq9av1llO7hyA', 20, 'succeeded', 'ch_3JxX9RHt4pOTq9av1P5iom2m', 'txn_3JxX9RHt4pOTq9av1IhDnfpE', 'usd', '', '1637403230');

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int NOT NULL,
  `review_id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `reply_desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`id`, `review_id`, `specialist_id`, `reply_desc`) VALUES
(679, 40, 81, 'thanku'),
(680, 40, 81, 'thanku');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `report_to` int NOT NULL COMMENT '1-specialist 0-user',
  `report_issue` text NOT NULL,
  `user_id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `specialist_country_id` int NOT NULL DEFAULT '0',
  `recommend_status` int NOT NULL,
  `review_desc` text NOT NULL,
  `review_star` int NOT NULL,
  `created_at` text NOT NULL,
  `updated_at` text CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `review_status` int NOT NULL DEFAULT '0',
  `read_status` int NOT NULL DEFAULT '0',
  `user_read_status` int NOT NULL DEFAULT '0',
  `specialist_read_status` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `specialist_id`, `specialist_country_id`, `recommend_status`, `review_desc`, `review_star`, `created_at`, `updated_at`, `review_status`, `read_status`, `user_read_status`, `specialist_read_status`) VALUES
(40, 185, 81, 0, 1, 'best', 5, 'Mon Feb 19 2024 17:46:52 GMT+0530 (India Standard Time)', NULL, 1, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `signup_newsletter`
--

CREATE TABLE `signup_newsletter` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `signup_newsletter`
--

INSERT INTO `signup_newsletter` (`id`, `name`, `email`, `created_at`) VALUES
(13, 'tesu', 'cresoluser@mail.com', '2024-02-29 16:07:43'),
(14, 'kasu', 'cresoluser@gmail.com', '2024-02-27 18:11:14'),
(15, 'kazi', 'cresoluser@gmail.com', '2024-02-27 18:48:57'),
(16, 'pazi', 'cresoluser@gmail.com', '2024-02-27 18:50:44'),
(17, 'kisd', 'cresoluser@gmail.com', '2024-02-27 19:05:32'),
(18, 'jbfjb', 'ajay@cresol.in', '2024-02-27 19:53:42'),
(19, 'cresol', 'cresoluser@gmail.com', '2024-02-27 19:59:28'),
(20, 'ajay', 'ajay@cresol.in', '2024-02-27 20:00:34'),
(21, 'ajay', 'ajay@cresol.in', '2024-02-27 20:02:21'),
(22, 'kati', 'kati@gmail.com', '2024-02-27 20:03:29');

-- --------------------------------------------------------

--
-- Table structure for table `specialist_active`
--

CREATE TABLE `specialist_active` (
  `id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_time` text NOT NULL,
  `status` int NOT NULL DEFAULT '0' COMMENT '0-offline,1-online'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_active`
--

INSERT INTO `specialist_active` (`id`, `specialist_id`, `last_login`, `last_login_time`, `status`) VALUES
(8, 76, '2024-01-15 07:14:31', '1705302871777', 1),
(9, 77, '2024-01-15 07:43:44', '1705304624163', 1),
(10, 78, '2024-01-15 08:36:54', '1705307814129', 1),
(11, 80, '2024-02-07 09:13:40', '1707297220791', 1),
(12, 81, '2024-02-07 10:55:10', '1707303310161', 1),
(13, 82, '2024-02-11 11:27:58', '1707650878188', 1);

-- --------------------------------------------------------

--
-- Table structure for table `specialist_degrees`
--

CREATE TABLE `specialist_degrees` (
  `id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `language_id` int NOT NULL,
  `degree_title` varchar(255) NOT NULL,
  `institute` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `other_information` text NOT NULL,
  `document_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_degrees`
--

INSERT INTO `specialist_degrees` (`id`, `specialist_id`, `language_id`, `degree_title`, `institute`, `year`, `details`, `other_information`, `document_file`, `status`, `created_at`, `updated_at`) VALUES
(99, 81, 1, 'raju1', 'rajuin2', '1993', 'hi raju degree2', 'new raju 2', '1708093117340-Koala.jpg', 1, NULL, NULL),
(100, 81, 1, 'jhbhjb', 'hjbhjb', '12', 'hbhjbhj', 'hjbhjb', '', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `specialist_holistics`
--

CREATE TABLE `specialist_holistics` (
  `id` int NOT NULL,
  `specialist_public_intro_id` int NOT NULL,
  `holistic_name` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_holistics`
--

INSERT INTO `specialist_holistics` (`id`, `specialist_public_intro_id`, `holistic_name`, `status`, `created_at`, `updated_at`) VALUES
(289, 64, '2', 1, NULL, NULL),
(290, 64, '3', 1, NULL, NULL),
(317, 65, '2', 1, NULL, NULL),
(318, 65, '3', 1, NULL, NULL),
(473, 66, '3', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `specialist_overivew_details`
--

CREATE TABLE `specialist_overivew_details` (
  `id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `consultation_id` int NOT NULL,
  `language_id` int NOT NULL,
  `overview_data` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_overivew_details`
--

INSERT INTO `specialist_overivew_details` (`id`, `specialist_id`, `consultation_id`, `language_id`, `overview_data`, `created_at`, `updated_at`) VALUES
(368, 81, 2, 1, 'chat part', '0000-00-00', '0000-00-00'),
(369, 81, 3, 1, 'chat full', '0000-00-00', '0000-00-00'),
(370, 81, 4, 1, 'video', '0000-00-00', '0000-00-00'),
(371, 81, 11, 1, 'vivo full', '0000-00-00', '0000-00-00'),
(372, 81, 12, 1, 'vivo part', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `specialist_private`
--

CREATE TABLE `specialist_private` (
  `id` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `std_code` varchar(10) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `country_id` int NOT NULL,
  `city_id` int NOT NULL,
  `place_birth` int DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `id_document_front` varchar(255) DEFAULT NULL,
  `id_document_back` varchar(255) DEFAULT NULL,
  `healthcare_university_degree` int DEFAULT '0',
  `university_degree` int DEFAULT '0',
  `other_text` varchar(255) DEFAULT NULL,
  `healthcare_documents` varchar(255) DEFAULT NULL,
  `university_documents` varchar(255) DEFAULT NULL,
  `other_documents` varchar(255) DEFAULT NULL,
  `account_holder` varchar(255) DEFAULT NULL,
  `iban` varchar(255) DEFAULT NULL,
  `bic` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0' COMMENT '1 - default , 2 email verification , 3 cancel , 4 publish 5 hide profile 6 publish and verified by admin ',
  `timezone` varchar(255) NOT NULL,
  `utc_offset_string` varchar(255) NOT NULL,
  `main_consult_language` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `mark_featured_spec` int DEFAULT NULL,
  `featured_order` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `reset_token` text NOT NULL,
  `newsletter_trigger` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_private`
--

INSERT INTO `specialist_private` (`id`, `first_name`, `last_name`, `email`, `dob`, `std_code`, `mobile`, `country_id`, `city_id`, `place_birth`, `password`, `id_document_front`, `id_document_back`, `healthcare_university_degree`, `university_degree`, `other_text`, `healthcare_documents`, `university_documents`, `other_documents`, `account_holder`, `iban`, `bic`, `status`, `timezone`, `utc_offset_string`, `main_consult_language`, `mark_featured_spec`, `featured_order`, `created_at`, `updated_at`, `reset_token`, `newsletter_trigger`) VALUES
(78, 'ajay1', 'specialist', 'ajay123@cresol.in', '2024-01-25', '', '9090909090', 1, 2, 1, 'cc8ad0e62eb1025c0c473daa360b4709', '1705308517812-favicon.ico', NULL, 0, 0, 'demo data ', NULL, NULL, NULL, NULL, NULL, NULL, 6, 'Asia/Kolkata', '+05:30', '1', 1, 9, '2024-01-15 14:04:00', NULL, '', 0),
(79, 'vivek', 'sharma', 'sharmavamvivek@gmail.com', '2024-02-06', '', '9879879879', 1, 2, 1, '2dd30b17a6529d7dbbacb4f555f40e6a', NULL, NULL, 0, 0, 'null', NULL, NULL, NULL, 'Vivek sharma', '789465123927947777777', '81799999999999999999999999999999999999999999999999999999999', 2, 'Asia/Kolkata', '+05:30', 'null', NULL, 0, '2024-02-04 15:25:09', NULL, '', 0),
(80, 'ajay2', 'specialist', 'ajay1234@cresol.in', NULL, '', '9090909090', 1, 2, NULL, 'f2c8cd6fbe8279dc3b42cf6b59eb2de2', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, 0, '2024-02-07 12:54:00', NULL, '', 0),
(81, 'ajay', 'specialist', 'ajay12@cresol.in', '2024-02-15', '', '1231231233', 1, 8, 1, 'cc8ad0e62eb1025c0c473daa360b4709', '1707316966744-id_card.jpg', '1707316966785-driver_lic.jpg', 1, 1, 'tg', '1707316421659-medicine_degreee.jpg', '1707316447620-driver_lic.jpg', NULL, 'ajay specialist', '1234567890', 'xyz', 6, 'Asia/Kolkata', '+05:30', '1', 1, 8, '2024-02-07 16:23:06', NULL, '', 0),
(82, 'Specialist', 'Sharma', 'cresolreactnative1@gmail.com', '1992-08-27', '', '8462039227', 1, 2, 1, '21da499f2a12aae18ed591ea31fe97c9', '1707651059437-WhatsAppImage2024-02-10at7.47.48PM(1).jpeg', '1707651059585-WhatsAppImage2024-02-10at7.47.48PM.jpeg', 1, 1, 'Others da', '1707651059669-cascade.jpg', '1707651059671-Chatgpt.jpg', '1707726370271-Desert.jpg', NULL, NULL, NULL, 4, 'Asia/Kolkata', '+05:30', '1', 0, 0, '2024-02-11 16:55:25', NULL, '', 0),
(83, 'maruza', 'dh', 'ajayshbdhb@cresol.in', NULL, '', '6789067890', 1, 2, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Asia/Kolkata', '+05:30', NULL, NULL, 0, '2024-02-27 19:11:24', NULL, '', 0),
(84, 'jdjhj', 'jhhj', 'bjdhbhj@gmail.com', NULL, '', '1234512345', 1, 2, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Asia/Kolkata', '+05:30', NULL, NULL, 0, '2024-02-27 19:17:02', NULL, '', 0),
(85, 'rab', 'hd', 'ajays@cresol.in', NULL, '', '6786786789', 1, 8, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, 0, '2024-02-27 19:37:51', NULL, '', 0),
(86, 'kanio', 'dhbdh', 'ajaysssscresol.in', NULL, '', '1234123412', 1, 2, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Asia/Kolkata', '+05:30', NULL, NULL, 0, '2024-02-27 19:42:24', NULL, '', 0),
(87, 'jbfjb', 'bjh', 'ajassssy@cresol.in', NULL, '', '12345', 1, 8, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, 0, '2024-02-27 19:52:49', NULL, '', 1),
(88, 'ajay', 'specialist', 'ajay@cresol.in', NULL, '', '1234512345', 1, 8, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Asia/Kolkata', '+05:30', NULL, NULL, 0, '2024-02-27 20:01:56', NULL, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `specialist_public_consultations`
--

CREATE TABLE `specialist_public_consultations` (
  `id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `provided_type` int NOT NULL COMMENT '1- Message 2message short , 3 full message , 4 video , 5 short video , 6 full video , 7 audio  ,8 short audio , 9 full audio , 10 in-person , 11 in person short , 12 in person full  ',
  `private_price` float NOT NULL,
  `public_price` float NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_public_consultations`
--

INSERT INTO `specialist_public_consultations` (`id`, `specialist_id`, `provided_type`, `private_price`, `public_price`, `status`, `created_at`, `updated_at`) VALUES
(1434, 78, 1, 20, 22, 1, NULL, NULL),
(1435, 78, 4, 40, 51.6, 1, NULL, NULL),
(1537, 81, 2, 120, 132, 1, NULL, NULL),
(1538, 81, 3, 300, 330, 1, NULL, NULL),
(1539, 81, 4, 100, 129, 1, NULL, NULL),
(1540, 81, 11, 20, 28, 1, NULL, NULL),
(1541, 81, 12, 10, 14, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `specialist_public_intros`
--

CREATE TABLE `specialist_public_intros` (
  `id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `language_id` int NOT NULL,
  `your_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `your_studies` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `country_id` int NOT NULL,
  `city_id` int NOT NULL,
  `profile_photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `consultation_description_message` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `consultation_description_message_part` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `consultation_description_message_full` text NOT NULL,
  `consultation_description_audio` text NOT NULL,
  `consultation_description_audio_part` text NOT NULL,
  `consultation_description_audio_full` text NOT NULL,
  `consultation_description_vivo` text NOT NULL,
  `consultation_description_vivo_part` text NOT NULL,
  `consultation_description_vivo_full` text NOT NULL,
  `consultation_description_video` text NOT NULL,
  `consultation_description_video_part` text NOT NULL,
  `consultation_description_video_full` text NOT NULL,
  `about_me` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `holistic_expertise` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `education` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `work_experience` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `work_experience_detail` text,
  `presentation_video_url1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `presentation_video_url2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `available_languages` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `other_contribution` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `mission` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `comments` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `holistic_center` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `holistic_location` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `working_time` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `activity_image1` varchar(255) DEFAULT NULL,
  `activity_image2` varchar(255) DEFAULT NULL,
  `activity_image3` varchar(255) DEFAULT NULL,
  `activity_image4` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `suggest_holistic_field` varchar(255) NOT NULL,
  `suggest_tag_field` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_public_intros`
--

INSERT INTO `specialist_public_intros` (`id`, `specialist_id`, `language_id`, `your_title`, `your_studies`, `country_id`, `city_id`, `profile_photo`, `consultation_description_message`, `consultation_description_message_part`, `consultation_description_message_full`, `consultation_description_audio`, `consultation_description_audio_part`, `consultation_description_audio_full`, `consultation_description_vivo`, `consultation_description_vivo_part`, `consultation_description_vivo_full`, `consultation_description_video`, `consultation_description_video_part`, `consultation_description_video_full`, `about_me`, `holistic_expertise`, `education`, `work_experience`, `work_experience_detail`, `presentation_video_url1`, `presentation_video_url2`, `available_languages`, `other_contribution`, `mission`, `comments`, `holistic_center`, `holistic_location`, `working_time`, `activity_image1`, `activity_image2`, `activity_image3`, `activity_image4`, `status`, `suggest_holistic_field`, `suggest_tag_field`, `created_at`, `updated_at`) VALUES
(65, 78, 1, 'health', 'bsc12', 1, 8, '1706534947187-Desert.jpg', NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'null', 'null', 'null', NULL, NULL, NULL, NULL, 1, '', '', NULL, NULL),
(66, 81, 1, 'neck stiffness daat', 'msc1234', 1, 8, '1707374915149-additional_image.png', '', 'chat part', 'chat full', '', '', '', '', 'vivo part', 'vivo full', 'video', '', 'undefined', 'djnd', 'kjndjn', 'kjnn', '2', 'uihuih', '', '', 'djjdh', 'kjbjb', 'hhjbhj', 'jjb', 'energy', 'holistaic location', 'Sun-16:00:00-16:30:00||', NULL, NULL, NULL, '1708060889524-Lighthouse.jpg', 0, '', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `specialist_tags`
--

CREATE TABLE `specialist_tags` (
  `id` int NOT NULL,
  `specialist_public_intro_id` int NOT NULL,
  `tags` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_tags`
--

INSERT INTO `specialist_tags` (`id`, `specialist_public_intro_id`, `tags`, `status`, `created_at`, `updated_at`) VALUES
(311, 64, 21, 1, NULL, NULL),
(325, 65, 21, 1, NULL, NULL),
(480, 66, 23, 1, NULL, NULL),
(481, 66, 21, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `specialist_transaction_from_medaloha`
--

CREATE TABLE `specialist_transaction_from_medaloha` (
  `id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `payment_status` int NOT NULL COMMENT '0-pending,1-paid',
  `transaction_id` text NOT NULL,
  `booking_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_transaction_from_medaloha`
--

INSERT INTO `specialist_transaction_from_medaloha` (`id`, `specialist_id`, `payment_status`, `transaction_id`, `booking_id`, `created_at`) VALUES
(8, 21, 1, 'abcd', 51, '2024-01-24 20:37:14');

-- --------------------------------------------------------

--
-- Table structure for table `specialist_working_hours`
--

CREATE TABLE `specialist_working_hours` (
  `id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `language_id` int DEFAULT NULL,
  `start_time` varchar(255) NOT NULL,
  `end_time` varchar(255) NOT NULL,
  `days` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `specialist_working_hours`
--

INSERT INTO `specialist_working_hours` (`id`, `specialist_id`, `language_id`, `start_time`, `end_time`, `days`, `created_at`, `updated_at`) VALUES
(780, 81, 1, '16:00:00', '16:30:00', 'Sun', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suggestions`
--

INSERT INTO `suggestions` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(16, 'test', 'cresoluser@gmail.com', 'hello i m your big fan', '2024-02-27 16:07:21');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int NOT NULL,
  `language_id` int NOT NULL,
  `tag_name` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by_id` int NOT NULL DEFAULT '0' COMMENT '0-by admin,1-by suggestion',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `language_id`, `tag_name`, `status`, `created_by_id`, `created_at`, `updated_at`) VALUES
(21, 1, 'test', 0, 0, '2024-01-15 14:19:40', '2024-02-01 13:43:51'),
(22, 1, 'rakul', 0, 0, '2024-02-16 11:11:20', '2024-02-24 23:04:36'),
(23, 1, 'ny testeramd', 1, 0, '2024-02-27 13:05:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE `testimonial` (
  `id` int NOT NULL,
  `text_author` text NOT NULL,
  `text_comment` text NOT NULL,
  `status` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testimonial`
--

INSERT INTO `testimonial` (`id`, `text_author`, `text_comment`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Eros1', 'As1 a practitioner, MedAloha is the best way –especially in these covid times- to comfortably and easily connect from home with people from everywhere and to share my passion for holistic health.', 0, '2021-12-18 18:54:10', '2024-02-27 11:23:15'),
(3, 'Andreas', 'Super intuitive and user-friendly.!', 1, '2021-12-18 19:28:13', '2022-02-23 19:45:18'),
(4, 'elisa', 'I was already planning private consultations by myself with health practitioners, by contacting and asking them for online sessions, but it took time and efforts… MedAloha is exactly what I was waiting for', 1, '2021-12-18 19:50:17', '2024-02-27 12:58:01'),
(5, 'demo12', 'demo123', 0, '2023-04-07 13:29:41', '2024-02-27 12:55:37'),
(6, 'Nitesh', 'Testing', 0, '2023-12-31 00:00:41', '2024-02-27 12:55:54'),
(7, 'test', 'hello', 0, '2024-02-27 11:20:59', '2024-02-27 12:55:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `std_code` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `country_id` int NOT NULL,
  `city_id` int NOT NULL,
  `timezone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `utc_offset_string` varchar(25) NOT NULL,
  `dob` date DEFAULT NULL,
  `street_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `zipcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `consultation_language` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_language_id` int DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `user_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `newsletter_trigger` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `reset_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `mobile`, `std_code`, `country_id`, `city_id`, `timezone`, `utc_offset_string`, `dob`, `street_address`, `zipcode`, `consultation_language`, `user_language_id`, `password`, `user_image`, `status`, `newsletter_trigger`, `created_at`, `updated_at`, `reset_token`) VALUES
(182, 'cresol', 'user', 'cressoluser@gmail.com', '9090909090', 'null', 1, 8, 'Asia/Kolkata', '+05:30', '2024-01-16', 'null', 'null', 'english', NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 1, '2024-01-15 12:49:48', NULL, ''),
(184, 'ajay', 'specialsit', 'dnjdbdbdjj@gmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 0, 1, '2024-02-12 12:24:17', NULL, ''),
(185, 'cresoluser', 'cresol', 'cresdsoluser@gmail.com', '9089089089', 'null', 1, 8, 'Asia/Kolkata', '+05:30', '2024-02-14', '', '', 'english', NULL, 'cc8ad0e62eb1025c0c473daa360b4709', '1708326149694-Koala.jpg', 2, 1, '2024-02-19 12:01:35', NULL, ''),
(186, 'tegi@gmail.com', 'test', 'tegi@gmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, '827ccb0eea8a706c4c34a16891f84e7b', NULL, 0, 1, '2024-02-27 16:31:16', NULL, ''),
(187, 'mainly', 'test', 'cresolusesr@gmail.com', NULL, NULL, 1, 8, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 1, '2024-02-27 16:46:30', NULL, ''),
(188, 'nath', 'sjj', 'cresddddoluser@gmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 1, '2024-02-27 16:53:17', NULL, ''),
(189, 'kahu', 'tera', 'cresolussssser@gmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 1, '2024-02-27 18:05:29', NULL, ''),
(190, 'rashu1', 'dkjnkjb', 'cresolsuser@gmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 1, '2024-02-27 18:16:18', NULL, ''),
(191, 'kazi', 'dhj', 'cresolusser@gmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 1, '2024-02-27 18:48:45', NULL, ''),
(192, 'pazi', 'jhdhb', 'cresoluserssgmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 0, '2024-02-27 18:50:30', NULL, ''),
(193, 'pezow', 'bdhbdh', 'cresolusewwwr@gmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 0, '2024-02-27 19:03:31', NULL, ''),
(194, 'kisd', 'dhbhjb', 'cresolusdder@gmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 1, '2024-02-27 19:05:22', NULL, ''),
(195, 'kanu', 'bdhj', 'ajay@sscresol.in', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 0, 1, '2024-02-27 19:41:29', NULL, ''),
(196, 'acre', 'djhdb', 'hbhjb@gmail.com', NULL, NULL, 1, 2, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 0, 1, '2024-02-27 19:45:04', NULL, ''),
(197, 'cresol', 'user', 'cresoluser@gmail.com', NULL, NULL, 1, 8, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 1, '2024-02-27 19:58:54', NULL, ''),
(198, 'ajay', 'specialist', 'ajay@cresol.in', NULL, NULL, 1, 8, 'Asia/Kolkata', '+05:30', NULL, NULL, NULL, NULL, NULL, 'cc8ad0e62eb1025c0c473daa360b4709', NULL, 2, 1, '2024-02-27 20:00:17', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `user_active`
--

CREATE TABLE `user_active` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_time` text NOT NULL,
  `status` int NOT NULL DEFAULT '0' COMMENT '0-offline,1-online'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user_active`
--

INSERT INTO `user_active` (`id`, `user_id`, `last_login`, `last_login_time`, `status`) VALUES
(112, 182, '2024-01-15 07:20:21', '1705303221937', 1),
(113, 185, '2024-02-19 06:34:18', '1708324458145', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_favourite_specialists`
--

CREATE TABLE `user_favourite_specialists` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `specialist_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_favourite_specialists`
--

INSERT INTO `user_favourite_specialists` (`id`, `user_id`, `specialist_id`, `created_at`, `updated_at`, `status`) VALUES
(26, 182, 78, '2024-01-25 17:39:09', '2024-01-25 17:39:09', 1),
(28, 185, 81, '2024-02-19 14:10:26', '2024-02-19 14:10:26', 1),
(29, 185, 78, '2024-02-20 20:05:29', '2024-02-20 20:05:29', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_histories`
--
ALTER TABLE `booking_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_next_slot`
--
ALTER TABLE `email_next_slot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `legends`
--
ALTER TABLE `legends`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `legends_commissions`
--
ALTER TABLE `legends_commissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_password`
--
ALTER TABLE `master_password`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medaloha_reports`
--
ALTER TABLE `medaloha_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `multiple_country_with_languages`
--
ALTER TABLE `multiple_country_with_languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refund`
--
ALTER TABLE `refund`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `signup_newsletter`
--
ALTER TABLE `signup_newsletter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_active`
--
ALTER TABLE `specialist_active`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_degrees`
--
ALTER TABLE `specialist_degrees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_holistics`
--
ALTER TABLE `specialist_holistics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_overivew_details`
--
ALTER TABLE `specialist_overivew_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_private`
--
ALTER TABLE `specialist_private`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_public_consultations`
--
ALTER TABLE `specialist_public_consultations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_public_intros`
--
ALTER TABLE `specialist_public_intros`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_tags`
--
ALTER TABLE `specialist_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_transaction_from_medaloha`
--
ALTER TABLE `specialist_transaction_from_medaloha`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialist_working_hours`
--
ALTER TABLE `specialist_working_hours`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `specialist_id` (`specialist_id`,`start_time`,`days`);

--
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonial`
--
ALTER TABLE `testimonial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_active`
--
ALTER TABLE `user_active`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_favourite_specialists`
--
ALTER TABLE `user_favourite_specialists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `booking_histories`
--
ALTER TABLE `booking_histories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `email_next_slot`
--
ALTER TABLE `email_next_slot`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=502;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `legends`
--
ALTER TABLE `legends`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `legends_commissions`
--
ALTER TABLE `legends_commissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `master_password`
--
ALTER TABLE `master_password`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `medaloha_reports`
--
ALTER TABLE `medaloha_reports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `multiple_country_with_languages`
--
ALTER TABLE `multiple_country_with_languages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `refund`
--
ALTER TABLE `refund`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=681;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `signup_newsletter`
--
ALTER TABLE `signup_newsletter`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `specialist_active`
--
ALTER TABLE `specialist_active`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `specialist_degrees`
--
ALTER TABLE `specialist_degrees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `specialist_holistics`
--
ALTER TABLE `specialist_holistics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=474;

--
-- AUTO_INCREMENT for table `specialist_overivew_details`
--
ALTER TABLE `specialist_overivew_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=373;

--
-- AUTO_INCREMENT for table `specialist_private`
--
ALTER TABLE `specialist_private`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `specialist_public_consultations`
--
ALTER TABLE `specialist_public_consultations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1542;

--
-- AUTO_INCREMENT for table `specialist_public_intros`
--
ALTER TABLE `specialist_public_intros`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `specialist_tags`
--
ALTER TABLE `specialist_tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=482;

--
-- AUTO_INCREMENT for table `specialist_transaction_from_medaloha`
--
ALTER TABLE `specialist_transaction_from_medaloha`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `specialist_working_hours`
--
ALTER TABLE `specialist_working_hours`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=781;

--
-- AUTO_INCREMENT for table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `testimonial`
--
ALTER TABLE `testimonial`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- AUTO_INCREMENT for table `user_active`
--
ALTER TABLE `user_active`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `user_favourite_specialists`
--
ALTER TABLE `user_favourite_specialists`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
