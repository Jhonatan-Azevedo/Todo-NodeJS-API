import TaskModel from "../model/TaskModel.js";
import {
  startOfDay, 
  endOfDay, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth,
  startOfYear,
  endOfYear
} from "date-fns"

const current = new Date();

class TaskController {

  async create(req, res) {
    const task = new TaskModel(req.body);
    await task
      .save()
      .then((resp) => {
        return res.status(200).json(resp);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async update(req, res) {
    await TaskModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((resp) => {
        return res.status(200).json(resp);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async all(req, res) {
    await TaskModel.find({macaddress: {'$in': req.params.macaddress}}).sort('when')
    .then(resp => {
      return res.status(200).json(resp)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
  }

  async show(req, res) {
    await TaskModel.findById(req.params.id)
      .then(resp => {
        if(resp) return res.status(200).json(resp)

        return res.status(404).json({error: 'Tarefa não encontrada.'})
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  }

  async delete(req, res) {
    await TaskModel.deleteOne({'_id': req.params.id})
      .then(resp => {
        return res.status(200).json(resp)
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  }

  async done(req, res) {
    await TaskModel.findByIdAndUpdate(
      {'_id': req.params.id},
      {'done': req.params.done},
      {new: true}
      )
      .then(resp => {
        return res.status(200).json(resp)
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  }

  async late(req, res) {
    await TaskModel
      .find({
          'when': {'$lt': current},
          'macaddress': {'$in': req.params.macaddress}
      })
      .sort('when')
      .then(resp => {
        return res.status(200).json(resp)
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  }

  async today(req, res) {
    await TaskModel
      .find({
        'macaddress': {'$in': req.params.macaddress},
        'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
      })
      .sort('when')
      .then(resp => {
        return res.status(200).json(resp)
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  }

  async week(req, res) {
    await TaskModel
      .find({
        'macaddress': {'$in': req.params.macaddress},
        'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
      })
      .sort('when')
      .then(resp => {
        return res.status(200).json(resp)
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  }
 
  async month(req, res) {
    await TaskModel
      .find({
        'macaddress': {'$in': req.params.macaddress},
        'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
      })
      .sort('when')
      .then(resp => {
        return res.status(200).json(resp)
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  }

  async year(req, res) {
    await TaskModel
      .find({
        'macaddress': {'$in': req.params.macaddress},
        'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
      })
      .sort('when')
      .then(resp => {
        return res.status(200).json(resp)
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  }
}

export default new TaskController();
