const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT || 5000;