#!/bin/bash
# Dokku Deployment Script for Helenlongjiao
# Team 06 - proj-dining

# 设置变量
GITHUB_USERNAME="helenlongjiao"
APP_NAME="dining-dev-helenlongjiao"
EMAIL="longjiao@ucsb.edu"

# 从 .env 文件获取的值
GOOGLE_CLIENT_ID="1012378878565-b1am7af28ujfm1aqb11muerssn5l2r79.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
UCSB_API_KEY="VA3XME1CPeevzOU8yGmRPVE6zW82nrPq"
ADMIN_EMAILS="phtcon@ucsb.edu,djensen@ucsb.edu,sanjaychandrasekaran@ucsb.edu,katelarrick@ucsb.edu,divyanipunj@ucsb.edu,samuelzhu@ucsb.edu,dgkirschbaum@ucsb.edu,natalieforte@ucsb.edu,abhiram_agina@ucsb.edu,andrewshen@ucsb.edu,austinchan@ucsb.edu,julia_lin@ucsb.edu,longjiao@ucsb.edu"

echo "=========================================="
echo "Deploying proj-dining to Dokku"
echo "App Name: ${APP_NAME}"
echo "=========================================="
echo ""

# 创建应用
echo "Step 1: Creating Dokku app..."
dokku apps:create ${APP_NAME}

# 创建并链接 PostgreSQL 数据库
echo "Step 2: Creating PostgreSQL database..."
dokku postgres:create ${APP_NAME}-db
dokku postgres:link ${APP_NAME}-db ${APP_NAME} --no-restart

# 配置 Dokku 设置
echo "Step 3: Configuring Dokku settings..."
dokku git:set ${APP_NAME} keep-git-dir true

# 设置环境变量
echo "Step 4: Setting environment variables..."
dokku config:set --no-restart ${APP_NAME} PRODUCTION=true
dokku config:set --no-restart ${APP_NAME} GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID}"
dokku config:set --no-restart ${APP_NAME} GOOGLE_CLIENT_SECRET="${GOOGLE_CLIENT_SECRET}"
dokku config:set --no-restart ${APP_NAME} UCSB_API_KEY="${UCSB_API_KEY}"
dokku config:set --no-restart ${APP_NAME} SOURCE_REPO=https://github.com/ucsb-cs156/proj-dining
dokku config:set --no-restart ${APP_NAME} ADMIN_EMAILS="${ADMIN_EMAILS}"

# 首次部署（HTTP）
echo "Step 5: Deploying application..."
dokku git:sync ${APP_NAME} https://github.com/ucsb-cs156/proj-dining main
dokku ps:rebuild ${APP_NAME}

# 启用 HTTPS
echo "Step 6: Enabling HTTPS..."
dokku letsencrypt:set ${APP_NAME} email ${EMAIL}
dokku letsencrypt:enable ${APP_NAME}

# 再次重建以应用 HTTPS
echo "Step 7: Rebuilding with HTTPS..."
dokku ps:rebuild ${APP_NAME}

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo ""
echo "Your app is available at:"
echo "https://${APP_NAME}.dokku-06.cs.ucsb.edu"
echo ""
echo "IMPORTANT: Make sure you've added this redirect URI to Google OAuth:"
echo "https://dining-dev-helenlongjiao.dokku-06.cs.ucsb.edu/login/oauth2/code/google"
echo ""
echo "To check app status:"
echo "  dokku ps:report ${APP_NAME}"
echo ""
echo "To view logs:"
echo "  dokku logs ${APP_NAME}"

