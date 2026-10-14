import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { CustomButton } from '../CustomButton/CustomButton';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from '../../theme';

export interface CustomModalProps {
  visible: boolean;
  title: string;
  description: string;
  icon?: React.ReactNode;
  positiveText: string;
  negativeText: string;
  onPositivePress: () => void;
  onNegativePress: () => void;
  positiveColor?: string;
}

/**
 * CustomModal — A fully customisable alert modal matching the app's UI.
 */
export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  description,
  icon,
  positiveText,
  negativeText,
  onPositivePress,
  onNegativePress,
  positiveColor = colors.primary,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onNegativePress}
    >
      <TouchableWithoutFeedback onPress={onNegativePress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Icon */}
              {icon ? (
                <View style={styles.iconContainer}>
                  {typeof icon === 'string' ? (
                    <Text style={styles.iconText}>{icon}</Text>
                  ) : (
                    icon
                  )}
                </View>
              ) : null}

              {/* Text */}
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>

              {/* Actions */}
              <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                  <CustomButton
                    title={negativeText}
                    onPress={onNegativePress}
                    variant="outline"
                  />
                </View>
                <View style={styles.buttonSpacing} />
                <View style={styles.buttonWrapper}>
                  <CustomButton
                    title={positiveText}
                    onPress={onPositivePress}
                    style={{
                      backgroundColor: positiveColor,
                      borderColor: positiveColor,
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.medium,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconText: {
    fontSize: 32,
    fontWeight: 'normal',
    ...(Platform.OS === 'ios' ? { fontFamily: 'Apple Color Emoji' } : {}),
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  buttonWrapper: {
    flex: 1,
  },
  buttonSpacing: {
    width: spacing.md,
  },
});
