import {
  findResourceById,
  addResource,
  updateResource,
  deleteResource as deleteResourceFromStore,
  listResources,
} from '../models/Resource.js';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// Helper to load dummy books from JSON file
const loadDummyBooks = () => {
  const cached = cache.get('dummyBooks');
  if (cached) {
    return cached;
  }
  const filePath = path.resolve('data', 'books.json');
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  cache.set('dummyBooks', data);
  return data;
};

// Upload resource
export const uploadResource = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { title, author, subject, type, isbn, publicationYear, dummyBookId } = req.body;

  let fileUrl = null;

  try {
    if (dummyBookId) {
      // Import metadata from dummy book
      const dummyBooks = loadDummyBooks();
      const dummyBook = dummyBooks.find((b) => b.id === Number(dummyBookId));
      if (!dummyBook) {
        return res.status(404).json({ success: false, message: 'Dummy book not found' });
      }
      const resource = addResource({
        title: dummyBook.title,
        author: dummyBook.author,
        subject: dummyBook.subject,
        type: 'book',
        isbn: dummyBook.isbn,
        publicationYear: dummyBook.publicationYear,
        dummyBookId: dummyBook.id,
        uploadedBy: req.user.id,
      });
      return res.status(201).json({ success: true, resource });
    } else {
      // Handle file upload (assume req.file is set by multer)
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'File is required for non-dummy resources' });
      }
      fileUrl = req.file.path;

      const resource = addResource({
        title,
        author,
        subject,
        type,
        isbn,
        publicationYear,
        fileUrl,
        uploadedBy: req.user.id,
      });
      return res.status(201).json({ success: true, resource });
    }
  } catch (error) {
    next(error);
  }
};

// Edit resource
export const editResource = (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const resource = findResourceById(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    const updatedResource = updateResource(id, updates);

    res.json({ success: true, resource: updatedResource });
  } catch (error) {
    next(error);
  }
};

// Delete resource
export const deleteResource = (req, res, next) => {
  const { id } = req.params;

  try {
    const resource = findResourceById(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    // Delete file if exists
    if (resource.fileUrl && fs.existsSync(resource.fileUrl)) {
      fs.unlinkSync(resource.fileUrl);
    }

    const deleted = deleteResourceFromStore(id);
    if (!deleted) {
      return res.status(500).json({ success: false, message: 'Failed to delete resource' });
    }

    res.json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    next(error);
  }
};

// List resources with pagination and filters
export const listResourcesHandler = (req, res, next) => {
  const { subject, type, author, page = 1, limit = 10 } = req.query;

  try {
    const result = listResources({ subject, type, author }, Number(page), Number(limit));

    res.json({
      success: true,
      page: result.page,
      totalPages: result.totalPages,
      totalResources: result.total,
      resources: result.resources,
    });
  } catch (error) {
    next(error);
  }
};

// Get resource details and signed URL
export const getResourceDetails = (req, res, next) => {
  const { id } = req.params;

  try {
    const resource = findResourceById(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    // For local filesystem, just return fileUrl as download URL
    const downloadUrl = resource.fileUrl || null;

    res.json({ success: true, resource, downloadUrl });
  } catch (error) {
    next(error);
  }
};

// Get dummy books metadata
export const getDummyBooks = (req, res, next) => {
  try {
    const dummyBooks = loadDummyBooks();
    res.json({ success: true, dummyBooks });
  } catch (error) {
    next(error);
  }
};

