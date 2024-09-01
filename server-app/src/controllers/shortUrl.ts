import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl } = req.body;
    const urlFound = await urlModel.find({ fullUrl });
    if (urlFound.length > 0) {
      res.status(409);
      res.send(urlFound);
    } else {
      const newUrl = await urlModel.create({ fullUrl });
      res.status(201).send(newUrl);
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Something went wrong");
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // const { url } = req.body;
    const shortUrls = await urlModel.find();
    if (shortUrls.length === 0) {
      res.status(404).send("message:Url not found");
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).json("message:Url not found");
    } else {
      shortUrl.clicks++;
      await shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
      // res.status(200).send(shortUrl);
    }
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (shortUrl) {
      res.status(204).send("Url deleted successfully.");
    }
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
};
