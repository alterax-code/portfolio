import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

const LIKES_FILE = path.join(process.cwd(), 'data', 'likes.json');

// Type pour les likes
interface Likes {
  [key: string]: number;
}

// Initialiser le fichier de likes si nécessaire
async function initLikesFile(): Promise<Likes> {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    try {
      const data = await fs.readFile(LIKES_FILE, 'utf-8');
      return JSON.parse(data);
    } catch {
      const initialLikes: Likes = {
        'site-recettes': 0,
        'jeu-pygame': 0,
        'jeu-unreal': 0,
      };
      await fs.writeFile(LIKES_FILE, JSON.stringify(initialLikes, null, 2));
      return initialLikes;
    }
  } catch (error) {
    console.error('Error initializing likes file:', error);
    throw error;
  }
}

// GET - Récupérer tous les likes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'get') {
      const likes = await initLikesFile();
      return NextResponse.json({ success: true, likes });
    }

    return NextResponse.json(
      { success: false, message: 'Action invalide' },
      { status: 400 }
    );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Ajouter un like
export async function POST(request: NextRequest) {
  try {
    const { project } = await request.json();

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Projet manquant' },
        { status: 400 }
      );
    }

    // Lire les likes actuels
    const likes = await initLikesFile();

    // Vérifier si le projet existe
    if (!(project in likes)) {
      return NextResponse.json(
        { success: false, message: 'Projet inconnu' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur a déjà liké (via cookie)
    const cookieStore = await cookies();
    const cookieName = `liked_${project}`;
    const hasLiked = cookieStore.get(cookieName);

    if (hasLiked) {
      return NextResponse.json({
        success: false,
        message: 'Vous avez déjà liké ce projet',
        likes: likes[project],
      });
    }

    // Incrémenter le like
    likes[project]++;

    // Sauvegarder
    await fs.writeFile(LIKES_FILE, JSON.stringify(likes, null, 2));

    // Créer la réponse avec le cookie
    const response = NextResponse.json({
      success: true,
      message: 'Like ajouté !',
      likes: likes[project],
    });

    // Définir le cookie (30 jours)
    response.cookies.set(cookieName, '1', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
