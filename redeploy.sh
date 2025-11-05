#!/bin/bash

echo "═══════════════════════════════════════════════════════"
echo "   🔧 NOOCARB - REDÉPLOIEMENT (Problème corrigé!)"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "✅ Les corrections ont été appliquées :"
echo "   - Chemins relatifs (./assets/...)"
echo "   - Configuration Vite mise à jour"
echo "   - Vercel rewrites ajoutés"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Rebuild
echo "🔨 Rebuild de l'application avec les corrections..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build réussi !"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Choisissez votre méthode de redéploiement :"
    echo ""
    echo "1) 🚀 Vercel CLI (redéployer automatiquement)"
    echo "2) 🌐 Instructions pour Vercel Dashboard"
    echo "3) 📦 Instructions pour Netlify Drop"
    echo "4) 🧪 Tester localement d'abord"
    echo "5) ❌ Annuler"
    echo ""
    
    read -p "Entrez votre choix (1-5): " choice
    
    case $choice in
        1)
            echo ""
            echo "🚀 Redéploiement vers Vercel..."
            
            if ! command -v vercel &> /dev/null; then
                echo "⚠️  Vercel CLI non trouvé. Installation..."
                npm install -g vercel
            fi
            
            echo ""
            echo "📤 Upload vers Vercel..."
            vercel --prod
            
            echo ""
            echo "✅ Redéploiement terminé !"
            echo "   Rafraîchissez votre URL Vercel (Ctrl+F5 pour vider le cache)"
            ;;
            
        2)
            echo ""
            echo "🌐 Instructions pour Vercel Dashboard :"
            echo ""
            echo "   1. Allez sur https://vercel.com/dashboard"
            echo "   2. Cliquez sur votre projet Noocarb"
            echo "   3. Cliquez sur '...' (trois points) puis 'Redeploy'"
            echo "   4. Ou uploadez à nouveau le dossier /workspace"
            echo ""
            echo "   Votre URL sera mise à jour automatiquement !"
            ;;
            
        3)
            echo ""
            echo "📦 Instructions pour Netlify Drop :"
            echo ""
            echo "   1. Allez sur https://app.netlify.com/drop"
            echo "   2. Glissez-déposez le dossier : $PWD/dist"
            echo "   3. Obtenez votre nouvelle URL !"
            echo ""
            ;;
            
        4)
            echo ""
            echo "🧪 Lancement du serveur de preview..."
            echo "   Ouvrez votre navigateur sur : http://localhost:4173"
            echo ""
            echo "   Appuyez sur Ctrl+C pour arrêter"
            echo ""
            npm run preview
            ;;
            
        5)
            echo ""
            echo "👋 Annulé. Vous pouvez redéployer plus tard."
            echo ""
            echo "💡 Pour redéployer :"
            echo "   - Exécutez : ./redeploy.sh"
            echo "   - Ou allez sur https://vercel.com et uploadez /workspace"
            ;;
            
        *)
            echo ""
            echo "❌ Choix invalide."
            ;;
    esac
else
    echo ""
    echo "❌ Erreur lors du build. Vérifiez les erreurs ci-dessus."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
