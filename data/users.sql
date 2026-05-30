CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `reset_token` varchar(100) NOT NULL,
  `token_expiry` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);
select * from users;

