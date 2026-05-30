CREATE TABLE `exchange` (
  `id` int NOT NULL,
  `orderid` varchar(100) DEFAULT NULL,
  `productName` varchar(100) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `exchange_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
select * from exchange.exchange;