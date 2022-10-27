"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
require('./config/passport');
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
// app.use(passport.session());
const port = process.env.PORT;
mongoose_1.default.connect(`${process.env.MONGO_URL}`, {
//useNewUrlParser: true
//useUnifiedTopology: true
}, err => {
    if (!err) {
        console.log('Database connection successed');
    }
    else {
        console.log('Error in connection ' + err);
    }
});
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/posts', passport_1.default.authenticate('jwt', { session: false }), post_route_1.default);
app.use('/api/users', passport_1.default.authenticate('jwt', { session: false }), user_route_1.default);
app.use('/api/categories', passport_1.default.authenticate('jwt', { session: false }), category_route_1.default);
app.use("/api", auth_route_1.default);
app.get('/', (req, res) => {
    res.send("/Hello World");
});
app.listen(port, () => {
    console.log(`[server]:Server is running at https://localhost:${port}`);
});
