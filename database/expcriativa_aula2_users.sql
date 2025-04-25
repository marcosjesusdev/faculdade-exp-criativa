-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: expcriativa_aula2
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `cpf` varchar(255) NOT NULL,
  `genero` varchar(255) NOT NULL,
  `dataNascimento` date NOT NULL DEFAULT '1970-01-01',
  `endereco` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Marcos Jesus da Silva','devmarcosjs@gmail.com','$2b$10$GM4Obghgpbw5aUuJK2Eo3OG/IF9e.Ci1DkAd5e9ZJXWTTjAiPIU.e','2025-03-13 18:22:01','2025-03-26 01:09:16',NULL,'','','1970-01-01',NULL),(2,'John Doe','1a1@example.com','$2b$10$2TepxDYDQfvHyaVh2u7WheAP3ZdZYkRsPJd/zLbxsxnflHcahQm1a','2025-03-13 23:09:18','2025-03-26 01:04:37',NULL,'','','1970-01-01',NULL),(3,'Eduardo Gomes Carlos','edu@gmail.com','$2b$10$PZn/c9kKoxvEL2WoCJMzIuIa8aLf8pS7PwmDg2F/uQcrfWRLEEBhK','2025-03-13 23:28:19','2025-03-13 23:28:19',NULL,'','','1970-01-01',NULL),(4,'marquim jesus love','marquim1@examplo.com','$2b$10$fv6b0uN81pVbSvU8b1qwNOZ8DFia0uBs8Qfqbr9G/6D7yc5OjRK/O','2025-03-20 18:27:51','2025-04-25 18:17:56','2025-04-25 18:17:56','','','1970-01-01',NULL),(5,'irineu','marquim1@irineu.com.br','$2b$10$Bg/BVgxusUaiz8h4d3L.YeZGU8izsw5k5dHYmx4F7QD5js/puplry','2025-03-20 18:47:33','2025-03-26 01:43:14','2025-03-26 01:43:14','','','1970-01-01',NULL),(6,'asada','dsadasda@dasdsada.com','$2b$10$GbK2fRNsPXu4Lfn9y0RncuJUAdhrr5TTya/wy9tRsu/s6mqFQuY16','2025-03-20 19:18:26','2025-03-26 01:42:18','2025-03-26 01:42:18','','','1970-01-01',NULL),(7,'Marcos Jesus da Silva','imarcosjesus@outlook.com','$2b$10$rE8LGmWWJpPHflYmms00COlTzXWY3Uv3a5E4wCxjnMrj.hWuW50yW','2025-03-20 19:40:03','2025-03-20 19:40:03',NULL,'','','1970-01-01',NULL),(8,'teste1','teste1@test1.com','$2b$10$bHpiIXMbZJ91trQrTwC2HOt5oV7MZURSr5EQqz3ZeVMJUAYaHr43m','2025-03-20 20:11:54','2025-03-26 01:38:24','2025-03-26 01:38:24','','','1970-01-01',NULL),(9,'teste2','teste2@test.com','$2b$10$OImCJ98vw.W7sBTSURZFfOHamH1IkwefiKcKws9dSJua9DfnHyAvm','2025-03-20 20:17:37','2025-03-26 01:27:38','2025-03-26 01:27:38','','','1970-01-01',NULL),(10,'teste para o professor','testeparaoprof@teste.com','$2b$10$.YOqdbI3mfrBzB9llWNSwezdNgZkjA/HjXhZHLuc2mpFWQ2MVhR4y','2025-03-20 21:43:42','2025-03-26 01:15:13','2025-03-26 01:15:13','','','1970-01-01',NULL),(11,'teste para o professor agora','testeparaoprof1@teste.com','$2b$10$bAKDW294zSL1JGHn.ax1JeWV9fGUSENCBGvBFCEAwSuvUaoFtYB5C','2025-03-20 21:51:36','2025-03-26 01:04:45','2025-03-26 01:04:45','','','1970-01-01',NULL),(12,'testezim1','testezim1@teste.com','$2b$10$Cs8FZBnJ3hyNN7fGXrd8NuCxTkSBN27PP.fAV0gWaikJvFP6uc0U.','2025-03-25 23:09:50','2025-03-26 00:37:39','2025-03-26 00:37:39','','','1970-01-01',NULL),(13,'testezim2','testezim2@teste.com','$2b$10$5rdCD452u/qhQIyzRkcQC.9w1z0IWxI6qei/MS9le/c7wJ.BVISgK','2025-03-25 23:10:17','2025-03-26 00:37:38','2025-03-26 00:37:38','','','1970-01-01',NULL),(15,'Marcos Jesus da Silva','testeparaoprof12@teste.com','$2b$10$.RehwryJTyQmcYXm4.HUd.jDxIV/43YOPCLAPumyqEFtUIdULKVGu','2025-03-27 17:10:16','2025-03-27 17:10:16',NULL,'','','1970-01-01',NULL),(17,'Marcos Jesus da Silva','marcos@test.com','$2b$10$7aiWmPS92GWc1Q8fYVJ29OOAAlQDpiJo/k9c5PiyXXVPF47xGxgQy','2025-04-25 18:17:15','2025-04-25 18:17:15',NULL,'','','1970-01-01',NULL),(18,'1','1@test.com','$2b$10$64ssKldNZWbXKt3PKna1j.8QuJPlR6spbucZWqCn3A.1O4LMSnZ2C','2025-04-25 18:21:23','2025-04-25 18:21:23',NULL,'','','1970-01-01',NULL),(19,'2','2@test.com','$2b$10$kk0cgrEvoQX9ximFKQbINOXMkLp3ed8ZDiN051COo1N0s4HbxkIom','2025-04-25 18:21:30','2025-04-25 18:21:30',NULL,'','','1970-01-01',NULL),(20,'3','3@test.com','$2b$10$bcuoh835FJi4ICc3kbMuPej9VFifTM4orqLOpnms6zCUxm7JpKpcW','2025-04-25 18:21:35','2025-04-25 18:21:35',NULL,'','','1970-01-01',NULL),(21,'4','4@test.com','$2b$10$G/qAm0wQB/rvqvzHFypYSeBHJLtl6WWuB70fUvjN6ifedLirGL5D6','2025-04-25 18:21:40','2025-04-25 18:21:40',NULL,'','','1970-01-01',NULL),(22,'5','5@test.com','$2b$10$8V4vi9SQf3LC0lEdpHT7aeVDEeTVToHkW/6rkm3FLl2XJ/bEea0kK','2025-04-25 18:21:44','2025-04-25 18:21:44',NULL,'','','1970-01-01',NULL),(23,'6','6@test.com','$2b$10$noh8XUv1oZXIa1bTHZObxeHfVzZYW43MpV/Dqm8JriML.Le1cIveu','2025-04-25 18:21:49','2025-04-25 18:21:49',NULL,'','','1970-01-01',NULL),(24,'7','7@test.com','$2b$10$HZ7EO7u26ENBNctZoHcWGegIfd6kX.sEt/V.yvIoN8dZEAhEdd8Ye','2025-04-25 18:21:54','2025-04-25 18:21:54',NULL,'','','1970-01-01',NULL),(25,'8','8@test.com','$2b$10$1bZiFXyCbYO54wusBBWJs.Jkrpp63eJJOnJPP.IE4PdHsZXdYNp4O','2025-04-25 18:22:43','2025-04-25 18:22:43',NULL,'','','1970-01-01',NULL),(26,'9','9@test.com','$2b$10$wPgpXNlHfzmbqu7tIkyeou4TX6hVs9nxJxBwLFTrkR5zmeb1m/Qga','2025-04-25 18:23:10','2025-04-25 18:23:10',NULL,'','','1970-01-01',NULL),(27,'10','10@test.com','$2b$10$Qo1eGqu2IsWDf2JE7Uf7iekhVD8ApRS4unbYswWGWSOS8rh06e23G','2025-04-25 18:23:16','2025-04-25 20:53:42','2025-04-25 20:53:42','','','1970-01-01',NULL),(28,'marcos111','marcos11@test.com','$2b$10$dnR74hb4.7MRfpne16n.N.Yweu5ih6fEH5GlaT2VhTwqF/UzMF.4.','2025-04-25 20:35:45','2025-04-25 20:35:45',NULL,'123456789','Masculino','1998-11-21','marcos,31,boqueirao'),(29,'marcos112','marcos112@test.com','$2b$10$uS0STcaF7ZZYUA4IGoeEjOnd2FtlZ0VAiWTx50NOSr3Dnzn91EhEO','2025-04-25 20:36:21','2025-04-25 20:53:35',NULL,'123456789','Masculino','1998-11-20','marcos,31,boqueirao'),(30,'testeprofessor11','testeprofessor11@test.com','$2b$10$Y1heHekOS9SDfhFknrxeqeDBTlB9Au0AjnYsebHvAFpaE3YsmQ61K','2025-04-25 20:52:47','2025-04-25 20:53:30',NULL,'1223332424','Masculino','1998-11-20','marcos,31,boqueirao');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-25 17:57:54
