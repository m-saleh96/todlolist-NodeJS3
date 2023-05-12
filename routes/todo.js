const express = require('express')
const UserModel = require('../model/model')
const fun = require('../fun')
const router = express.Router()

router.post("/" , fun.add)
router.get("/" , fun.list)
router.delete("/:id" , fun.remove)
router.put("/:id/" , fun.edit)
router.put("/:id/check" , fun.check)
router.put("/:id/uncheck" , fun.uncheck)


module.exports = router



